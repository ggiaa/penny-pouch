import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { immer } from "zustand/middleware/immer";
import moment from "moment";

const { create } = require("zustand");

const useStore = create((set, get) => ({
  balance: 0,
  recentTransactions: [],
  currentMonthBalance: { income: 0, expense: 0 },
  monthlyTransactions: [],
  accounts: [],
  currentWeekTransactions: [],
  categories: [],

  fetchAccounts: async () => {
    const q = query(collection(db, "accounts"));
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

    // UPDATE DATA FOR CURRENT WEEK TRANSACTIONS (STATISTIC ON HOME PAGE)
    const tempCurrentWeekTransactions = get().currentWeekTransactions;
    const date = moment(params.date).format("YYYY-MM-DD");
    const index = tempCurrentWeekTransactions.allThisWeekDate.indexOf(date);

    // if date is in current week
    if (index >= 0) {
      if (params.is_income) {
        tempCurrentWeekTransactions.income[index] += parseInt(params.amount);
      } else if (params.is_expense) {
        tempCurrentWeekTransactions.expense[index] += parseInt(params.amount);
      }
    }

    set({ currentWeekTransactions: tempCurrentWeekTransactions });
  },
  editTransaction: async (params) => {
    const transactionId = params.id;
    const updatedTransactionData = {
      account: params.account,
      amount: params.amount,
      date: params.date,
      note: params.note,
      category: params.category,
      sub_category: params.sub_category,
      is_expense: params.is_expense,
      is_income: params.is_income,
      icon: params.icon,
      id: transactionId,
    };

    // Update di firebase
    const transactionRef = doc(db, "transactions", transactionId);
    await updateDoc(transactionRef, updatedTransactionData);

    // Update recent transaction
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

    // update currentWeekTransaction
    const income = [0, 0, 0, 0, 0, 0, 0];
    const expense = [0, 0, 0, 0, 0, 0, 0];
    const allThisWeekDate = [];

    const startWeek = new Date(moment().startOf("week"));
    const endWeek = new Date(moment().endOf("week"));

    for (var i = 0; i <= 6; i++) {
      allThisWeekDate.push(
        moment(startWeek).add(i, "days").format("YYYY-MM-DD")
      );
    }

    const q2 = query(
      collection(db, "transactions"),
      where("date", ">=", new Date(moment().startOf("week"))),
      where("date", "<=", new Date(moment().endOf("week"))),
      orderBy("date")
    );

    const querySnapshot2 = await getDocs(q2);
    const filteredData2 = querySnapshot2.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    filteredData2.map((transaction) => {
      const date = moment(transaction.date.toDate()).format("YYYY-MM-DD");
      const index = allThisWeekDate.indexOf(date);

      transaction.is_income
        ? (income[index] += parseInt(transaction.amount))
        : (expense[index] += parseInt(transaction.amount));
    });
    set({ currentWeekTransactions: { allThisWeekDate, income, expense } });
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
  savePinnedAccounts: async (newPinned, newUnpinned) => {
    // console.log(newPinned);
    // console.log(newUnpinned);
    const accounts = get().accounts;
    // const currentPinnedAccounts = accounts
    //   .filter((account) => account.pinned)
    //   .map((account) => account.id);
    const newPinnedAccounts = newPinned.map((acc) => acc.id);
    const newUnpinnedAccounts = newUnpinned.map((acc) => acc.id);

    const batch = writeBatch(db);
    // currentPinnedAccounts.map((acc) => {
    //   const ref = doc(db, "accounts", acc);
    //   batch.update(ref, { pinned: false });

    //   // update item untuk dimasukkan ke state
    //   accounts.map((item) => {
    //     // console.log(item.id);
    //     const record = item;
    //     if (item.id == acc) {
    //       record.pinned = false;
    //     }
    //   });
    // });

    newPinnedAccounts.map((acc, i) => {
      const ref = doc(db, "accounts", acc);
      batch.update(ref, { pinned: true, pinned_order: i + 1 });

      // update item untuk dimasukkan ke state
      accounts.map((item, i) => {
        if (acc == item.id) {
          item["pinned"] = true;
          item["pinned_order"] = i + 1;
        }
        return item;
      });
    });

    // console.log(newUnpinnedAccounts);
    newUnpinnedAccounts.map((acc, i) => {
      const ref = doc(db, "accounts", acc);
      batch.update(ref, {
        pinned: false,
        pinned_order: newPinnedAccounts.length + i + 1,
      });

      // update item untuk dimasukkan ke state
      accounts.map((item, i) => {
        if (acc == item.id) {
          item["pinned"] = false;
          item["pinned_order"] = newPinnedAccounts.length + i + 1;
        }
        return item;
      });
    });

    console.log(accounts);

    const newAccounts = [...newPinned, ...newUnpinned];
    const updatedNewAccounts = newAccounts.map((acc, i) => {
      acc["pinned_order"] = i + 1;
      return acc;
    });

    // console.log(updatedNewAccounts);
    await batch.commit();
    set({ accounts: updatedNewAccounts });
  },
  fetchCurrentWeekTransactions: async () => {
    const income = [0, 0, 0, 0, 0, 0, 0];
    const expense = [0, 0, 0, 0, 0, 0, 0];
    const allThisWeekDate = [];

    const startWeek = new Date(moment().startOf("week"));
    const endWeek = new Date(moment().endOf("week"));

    for (var i = 0; i <= 6; i++) {
      allThisWeekDate.push(
        moment(startWeek).add(i, "days").format("YYYY-MM-DD")
      );
    }

    const q = query(
      collection(db, "transactions"),
      where("date", ">=", new Date(moment().startOf("week"))),
      where("date", "<=", new Date(moment().endOf("week"))),
      orderBy("date")
    );

    const querySnapshot = await getDocs(q);
    const filteredData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    filteredData.map((transaction) => {
      const date = moment(transaction.date.toDate()).format("YYYY-MM-DD");
      const index = allThisWeekDate.indexOf(date);

      transaction.is_income
        ? (income[index] += parseInt(transaction.amount))
        : (expense[index] += parseInt(transaction.amount));
    });
    set({ currentWeekTransactions: { allThisWeekDate, income, expense } });
  },
  fetchCategories: async () => {
    const q = query(collection(db, "categories"), orderBy("name"));
    const querySnapshot = await getDocs(q);
    const filteredData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      // date: doc.data().date.toDate(),
    }));
    set({ categories: filteredData });
  },
  saveSubCategory: async (category, sub_category, newSubCategory) => {
    const categoryref = doc(db, "categories", category);
    let categories = get().categories;

    if (!newSubCategory) {
      await updateDoc(categoryref, {
        sub_category: sub_category,
      });

      const updatedCategory = categories.map((cat) => {
        if (cat.id == category) {
          cat.sub_category = sub_category;
        }

        return cat;
      });
      set({ categories: updatedCategory });
    } else {
      await updateDoc(categoryref, {
        sub_category: arrayUnion(newSubCategory),
      });

      const updatedCategory = categories.map((cat) => {
        if (cat.id == category) {
          cat.sub_category.push(newSubCategory);
        }

        return cat;
      });

      set({ categories: updatedCategory });
    }
  },
  deleteCategory: async (category, index) => {
    let categories = get().categories;
    const subcategory = category.sub_category.filter((sub, i) => i !== index);

    const categoryref = doc(db, "categories", category.id);
    await updateDoc(categoryref, {
      sub_category: subcategory,
    });

    const updatedCategory = categories.map((cat) => {
      if (cat.id == category.id) {
        cat.sub_category = subcategory;
      }

      return cat;
    });

    set({ categories: updatedCategory });
  },
}));

export default useStore;
