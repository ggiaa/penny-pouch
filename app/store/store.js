import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { immer } from "zustand/middleware/immer";

const { create } = require("zustand");

const useStore = create((set, get) => ({
  balance: 0,
  recentTransactions: [],
  addIncome: () => set((state) => ({ balance: state.balance + 1 })),
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
  },
}));

export default useStore;
