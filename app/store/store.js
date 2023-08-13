import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { immer } from "zustand/middleware/immer";

const { create } = require("zustand");

const useStore = create((set, get) => ({
  balance: 0,
  recentTransactions: [],
  currentMonthBalance: { income: 0, expense: 0 },
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
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

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

    var income = 0;
    var expense = 0;

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
  addTransaction: async (params) => {
    var newTransaction = {
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

    var currentRecentTrans = get().recentTransactions;
    currentRecentTrans.push(newTransaction);

    currentRecentTrans.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    if (currentRecentTrans.length > 6) {
      var currentRecentTrans = currentRecentTrans.slice(0, 6);
    }

    set({
      recentTransactions: currentRecentTrans,
    });

    var income = get().currentMonthBalance.income;
    var expense = get().currentMonthBalance.expense;

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
}));

export default useStore;
