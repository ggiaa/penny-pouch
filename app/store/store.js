import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { immer } from "zustand/middleware/immer";

const { create } = require("zustand");

const useStore = create((set, get) => ({
  balance: 0,
  recentTransactions: [],
  currentMonthBalance: { income: 0, expense: 0 },
  monthlyTransactions: [],
  accounts: [],

  fetchAccounts: async () => {
    const q = query(
      collection(db, "accounts")
      // orderBy("date", "desc"),
      // limit(6)
    );
    const querySnapshot = await getDocs(q);
    const filteredData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      // date: doc.data().date.toDate(),
    }));
    set({ accounts: filteredData });
  },
  fetchRecentTransactions: async () => {
    const q = query(
      collection(db, "transactions"),
      orderBy("date", "desc"),
      limit(6)
    );
    const querySnapshot = await getDocs(q);
    const filteredData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      date: doc.data().date.toDate(),
    }));
    set({ recentTransactions: filteredData });
  },
  fetchCurrentMonthBalance: async () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const q = query(
      collection(db, "transactions"),
      where("date", ">=", firstDay),
      where("date", "<=", lastDay)
    );
    const querySnapshot = await getDocs(q);
    const filteredData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      date: doc.data().date.toDate(),
    }));

    let income = 0;
    let expense = 0;

    filteredData.forEach((element) => {
      if (element.is_income) {
        income += parseInt(element.amount);
      } else if (element.is_expense) {
        expense += parseInt(element.amount);
      }
    });

    set((state) => ({
      currentMonthBalance: {
        ...state.currentMonthBalance,
        income: income,
        expense: expense,
      },
    }));
  },
  fetchMonthlyTransactions: async ({ startDate, endDate }) => {
    const q = query(
      collection(db, "transactions"),
      where("date", ">=", startDate),
      where("date", "<=", endDate)
    );
    const querySnapshot = await getDocs(q);
    const filteredData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      date: doc.data().date.toDate(),
    }));
    set({ monthlyTransactions: filteredData });
  },
  addTransaction: async (params) => {
    const newTransaction = {
      account: params.account,
      amount: params.amount,
      date: params.date,
      note: params.note,
      category: params.category,
      sub_category: params.sub_category,
      is_expense: params.is_expense,
      is_income: params.is_income,
      icon: params.icon,
    };

    await addDoc(collection(db, "transactions"), newTransaction);

    const currentRecentTrans = await get().recentTransactions;
    currentRecentTrans.push(newTransaction);

    currentRecentTrans.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    // console.log(currentRecentTrans);
    let currRecentTrans = [];
    if (currentRecentTrans.length > 6) {
      currRecentTrans = currentRecentTrans.slice(0, 6);
    }

    set({
      recentTransactions: currRecentTrans,
    });

    let income = get().currentMonthBalance.income;
    let expense = get().currentMonthBalance.expense;

    if (newTransaction.is_income) {
      income += parseInt(newTransaction.amount);
    } else if (newTransaction.is_expense) {
      expense += parseInt(newTransaction.amount);
    }

    set((state) => ({
      currentMonthBalance: {
        ...state.currentMonthBalance,
        income: income,
        expense: expense,
      },
    }));
  },
  deleteAccounts: async (id) => {
    await deleteDoc(doc(db, "accounts", id));
    const acc = get().accounts.filter((account) => account.id !== id);
    set({ accounts: acc });
  },
  saveAccount: async (params, mode) => {
    if (mode == "add") {
      const newAccount = {
        account_name: params.accountName,
        amount: params.accountBalance,
        pinned: false,
        pinned_order: 99,
      };

      const docRef = await addDoc(collection(db, "accounts"), newAccount);
      set((state) => ({
        accounts: [...state.accounts, { ...newAccount, id: docRef.id }],
      }));
    } else if (mode == "edit") {
      await updateDoc(doc(db, "accounts", params.accountId), {
        account_name: params.accountName,
        amount: params.accountBalance,
      });

      const acc = get().accounts.map((account) => {
        if (account.id == params.accountId) {
          account["account_name"] = params.accountName;
          account["amount"] = params.accountBalance;
        }

        return account;
      });
      set({ accounts: acc });
    }
  },
}));

export default useStore;
