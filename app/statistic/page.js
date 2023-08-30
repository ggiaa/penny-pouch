"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Calendar from "../components/Statistic/Calendar";
import useStore from "../store/store";

function statistic() {
  const date = new Date();

  const [startDate, setStartDate] = useState(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );
  const [endDate, setEndDate] = useState(
    new Date(date.getFullYear(), date.getMonth() + 1, 0)
  );

  const modeStore = useStore();

  const transactions = useStore((state) => state.monthlyTransactions);

  useEffect(() => {
    modeStore.fetchMonthlyTransactions({
      startDate: startDate,
      endDate: endDate,
    });
  }, []);

  return (
    <div className="w-full h-full flex gap-x-4">
      <div className="w-[72%] bg-white rounded-md p-4 flex flex-col">
        <Calendar />
      </div>
      <div className="flex-grow">
        <div className="text-sm bg-white p-2 rounded">
          <p className="mb-1 font-semibold ">Today (19 Jan)</p>
          {[1, 1, 1, 1].map((e, i) => (
            <div className="justify-between flex font-light pl-4 mb-1" key={i}>
              <div>
                <p>food {">"} lunch</p>
                <p className="text-xs">Cococrunch</p>
              </div>
              <p>Rp25.000</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default statistic;
