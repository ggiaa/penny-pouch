"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Calendar from "../components/Statistic/Calendar";
import useStore from "../store/store";
import moment from "moment";
import { IoIosArrowForward } from "react-icons/io";
import { NumericFormat } from "react-number-format";

function statistic() {
  const [selectedDate, setSelectedDate] = useState();

  const date = new Date();

  const [calendarStart, setCalendarStart] = useState();
  const [calendarEnd, setCalendarEnd] = useState();

  const [actualMonth, setActualMonth] = useState();
  const [actualYear, setActualYear] = useState();

  const [startDate, setStartDate] = useState(
    new Date(date.getFullYear(), date.getMonth() - 1, 1)
  );
  const [endDate, setEndDate] = useState(
    new Date(date.getFullYear(), date.getMonth() + 1, 0)
  );

  const modeStore = useStore();

  const transactions = useStore((state) => state.monthlyTransactions);

  // console.log(transactions);
  // console.log(selectedDate);

  useEffect(() => {
    if (
      !isNaN(moment(calendarStart).toDate()) &&
      !isNaN(moment(calendarEnd).toDate())
    ) {
      // console.log("here");
      modeStore.fetchMonthlyTransactions({
        startDate: moment(calendarStart).toDate(),
        endDate: moment(calendarEnd).toDate(),
      });
    }
  }, [calendarStart, calendarEnd]);

  return (
    <div className="w-full h-full flex gap-x-4">
      <div className="w-[72%] bg-white rounded-md p-4 flex flex-col">
        <Calendar
          transactions={transactions}
          setCalendarStart={setCalendarStart}
          setCalendarEnd={setCalendarEnd}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div className="flex-grow">
        <div className="text-sm bg-white p-2 rounded h-full divide-y">
          {transactions
            .filter(
              (transactions) =>
                moment(transactions.date).format("YYYY-MM-DD") == selectedDate
            )
            .map((item, i) => (
              <div
                className="justify-between flex font-light pl-4 mb-1 py-2"
                key={i}
              >
                <div>
                  <div className="flex items-center font-medium">
                    <p className="">{item.category}</p>
                    <IoIosArrowForward />
                    <p className="">{item.sub_category}</p>
                  </div>
                  <p className="text-sm">{item.note}</p>
                </div>
                <div className="flex items-center">
                  <p
                    className={`font-medium ${
                      item.is_income ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <NumericFormat
                      value={item.amount}
                      displayType={"text"}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix={"Rp"}
                    />
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default statistic;
