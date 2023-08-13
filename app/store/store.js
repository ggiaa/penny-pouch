import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";

const { create } = require("zustand");

const useStore = create((set) => ({
  balance: 0,
  recentTransactions: [],
  addIncome: () => set((state) => ({ balance: state.balance + 1 })),
  fetchRecentTransactions: async () => {
    const q = query(collection(db, "transactions"), orderBy("date"), limit(6));
    const querySnapshot = await getDocs(q);
    const filteredData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    set({ recentTransactions: filteredData });
  },
}));

export default useStore;
