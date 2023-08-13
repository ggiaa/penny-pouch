"use client";

import Image from "next/image";
import {
  AiOutlineCrown,
  AiOutlineFieldTime,
  AiOutlineSafety,
} from "react-icons/ai";
import {
  IoIosArrowRoundDown,
  IoIosArrowRoundUp,
  IoIosArrowForward,
} from "react-icons/io";
import RecentTransaction from "./components/Home/RecentTransaction";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "./config/firebase";
import useStore from "./store/store";

export default function Home() {
  const modeStore = useStore();
  const storeData = useStore((state) => state);

  const recentTransactions = useStore((state) => state.recentTransactions);

  console.log(storeData);

  useEffect(() => {
    modeStore.fetchRecentTransactions();
  }, []);

  return (
    <div className="h-full grid grid-cols-12 gap-x-2">
      <div className="col-span-2 grid grid-rows-6 gap-y-2">
        <div className="bg-white shadow-md row-span-2 p-2 rounded-md flex flex-col justify-center items-center text-center text-sm">
          <p className="font-bold text-lg">PENNY POUCH</p>
          <p>Your money's assistent</p>
          <div className="mt-6">
            <p>Good Evening,</p>
            <p className="font-semibold">John Doe</p>
          </div>
        </div>
        <div className="bg-white shadow-md row-span-4 p-2 rounded-md">
          <p className="mb-4">Accounts</p>
          {[1, 2, 3, 4, 5].map((item) => (
            <div className="text-sm bg-sky-300 rounded-md p-2 mb-2" key={item}>
              <p>Cash</p>
              <p className="text-right">Rp310.000</p>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-7 grid grid-rows-6 gap-y-2">
        {/* <div className="bg-white p-2 rounded-md shadow-md gap-x-4 row-span-2 grid grid-cols-2">
          <div>
            <p className="mb-3">Budget</p>
            {[1, 2, 2, 1, 1].map((item) => (
              <div className="flex gap-x-2 mt-2">
                <p className="text-sm">Food</p>
                <div className="w-full bg-slate-300 rounded-full overflow-hidden relative">
                  <div className="bg-blue-400 text-sm rounded-full h-full w-[40%]">
                    {" "}
                  </div>
                  <p className="text-center text-sm absolute bottom-0 top-0 left-0 right-0 text-slate-800">
                    36%
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="mb-3">Savings</p>
            {[1, 2, 2, 1, 1].map((item) => (
              <div className="flex gap-x-2 mt-2">
                <p className="text-sm">Food</p>
                <div className="w-full bg-slate-300 rounded-full overflow-hidden relative group">
                  <div className="bg-blue-400 text-sm rounded-full h-full w-[60%] group-hover:hidden">
                    {" "}
                  </div>
                  <p className="text-center text-sm absolute bottom-0 top-0 left-0 right-0 text-slate-800 group-hover:hidden">
                    60%
                  </p>

                  <div className="bg-purple-400 text-sm rounded-full h-full w-full group-hover:block">
                    {" "}
                  </div>
                  <p className="text-center text-sm absolute bottom-0 top-0 left-0 right-0 text-slate-800 hidden group-hover:block">
                    Rp250.000/Rp750.000
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="grid grid-cols-3 row-span-2 gap-x-2">
          <div className="bg-white p-2 rounded-md shadow-md col-span-2">
            <p>Today Budget Expense</p>
            {[1, 2, 3, 4, 5].map((item) => (
              <div className="grid grid-cols-12 mt-2" key={item}>
                <p className="text-sm col-span-3">Food</p>
                <div className="w-full bg-slate-300 col-span-9 rounded-full overflow-hidden relative group">
                  <div className="bg-blue-400 text-sm rounded-full h-full w-[40%] group-hover:hidden">
                    {" "}
                  </div>
                  <p className="text-center text-sm absolute bottom-0 top-0 left-0 right-0 text-slate-800 group-hover:hidden">
                    36%
                  </p>
                  <div className="bg-purple-400 text-sm rounded-full h-full w-full group-hover:block">
                    {" "}
                  </div>
                  <p className="text-center text-sm absolute bottom-0 top-0 left-0 right-0 text-slate-800 hidden group-hover:block">
                    Rp250.000/Rp750.000
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white shadow-md p-2 rounded-md">
            <p className="mb-4">2023 Progress</p>
            <div className="text-sm flex items-center gap-x-2 mb-2">
              <AiOutlineCrown className="text-lg" />
              <p>7 goals achieved</p>
            </div>
            <div className="text-sm flex items-center gap-x-2 mb-2">
              <AiOutlineFieldTime className="text-lg" />
              <p>3 goals in progress</p>
            </div>
            <div className="text-sm flex items-center gap-x-2 mb-2">
              <AiOutlineSafety className="text-lg" />
              <p>Rp10.000.000 saved</p>
            </div>
          </div>
          {/* <div className="bg-white shadow-md p-2 rounded-md">
            <p className="mb-4">2023 Progress</p>
            <div className="text-sm flex items-center gap-x-2 mb-2">
              <AiOutlineCrown className="text-lg" />
              <p>7 goals achieved</p>
            </div>
            <div className="text-sm flex items-center gap-x-2 mb-2">
              <AiOutlineFieldTime className="text-lg" />
              <p>3 goals in progress</p>
            </div>
            <div className="text-sm flex items-center gap-x-2 mb-2">
              <AiOutlineSafety className="text-lg" />
              <p>Rp10.000.000 saved</p>
            </div>
          </div> */}
        </div>
        <div className="bg-white shadow-md row-span-4 p-2 rounded-md">
          Chart
        </div>
      </div>
      <div className="col-span-3 grid grid-rows-6 gap-y-2">
        <div className="bg-white rounded-md p-2 shadow-md text-center flex justify-center flex-col gap-y-1 w-full h-full">
          <p className="text-sm">My Balance</p>
          <p className="font-semibold">Rp2.456.500</p>
        </div>
        <div className="bg-white shadow-md rounded-md p-2 grid grid-cols-2 divide-x divide-slate-300">
          <div className="flex items-center gap-x-1">
            <IoIosArrowRoundDown className="text-3xl text-green-600" />
            <div>
              <p className="text-sm">Income</p>
              <p className="text-green-600">Rp1.200.000</p>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <IoIosArrowRoundUp className="text-3xl text-red-600" />
            <div>
              <p className="text-sm">Income</p>
              <p className="text-red-600">Rp1.200.000</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md row-span-4 p-2 rounded-md">
          <RecentTransaction recentTransactions={recentTransactions} />
        </div>
      </div>
    </div>
  );
}
