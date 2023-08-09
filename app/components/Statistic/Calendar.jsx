"use client";

import React, { useEffect, useState } from "react";

function Calendar() {
  const [currentDate, setCurrentDate] = useState();
  const [months, setmonths] = useState([
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ]);
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [date, setDate] = useState();

  let date1 = new Date();
  const getCalendar = () => {
    let PreviousMonth = month - 1;
    let NextMonth = month + 1;

    let firstDateOfMonth = new Date(year, month, 1).getDay();
    let lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    let lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();

    let lastDateOfPreviousMonth = new Date(year, month, 0).getDate();

    let allDate = [];

    // Date before current month
    for (let i = firstDateOfMonth; i > 0; i--) {
      allDate.push(
        <div
          key={year + "-" + PreviousMonth + "-" + i}
          className="border-r-[1px] border-b-[1px] border w-[calc(99%/7)] h-14"
        >
          <p>{lastDateOfPreviousMonth - i + 1}</p>
        </div>
      );
    }

    // Current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
      allDate.push(
        <div
          key={year + "-" + month + "-" + i}
          className={`border-r-[1px] border-b-[1px] border w-[calc(99%/7)] h-14 ${
            currentDate == year + "-" + month + "-" + i
              ? "bg-slate-200"
              : "bg-white"
          }`}
        >
          <p className="bg-red-300">{i}</p>
        </div>
      );
    }

    // Date after current month
    for (let i = lastDayOfMonth; i < 6; i++) {
      allDate.push(
        <div
          key={year + "-" + NextMonth + "-" + i}
          className="border-r-[1px] border-b-[1px] border w-[calc(99%/7)] h-14"
        >
          <p>{i - lastDayOfMonth + 1}</p>
        </div>
      );
    }

    return allDate;
  };

  const changeToPreviousMonth = () => {
    if (month - 1 < 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const changeToNextMonth = () => {
    if (month + 1 > 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  useEffect(() => {
    const date = new Date();
    setCurrentDate(
      date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
    );
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setDate(date.getDate());
  }, []);

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <p className="text-left font-semibold mb-1">
            {months[month]} {year}
          </p>
          <div className="flex gap-x-4 cursor-pointer">
            <div onClick={changeToPreviousMonth}>Previous</div>
            <div onClick={changeToNextMonth}>Next</div>
          </div>
        </div>

        <div className="flex">
          <div className="w-[calc(100%/7)] text-center">
            <p fontSize={14}>SUN</p>
          </div>
          <div className="w-[calc(100%/7)] text-center">
            <p fontSize={14}>MON</p>
          </div>
          <div className="w-[calc(100%/7)] text-center">
            <p fontSize={14}>TUE</p>
          </div>
          <div className="w-[calc(100%/7)] text-center">
            <p fontSize={14}>WED</p>
          </div>
          <div className="w-[calc(100%/7)] text-center">
            <p fontSize={14}>THU</p>
          </div>
          <div className="w-[calc(100%/7)] text-center">
            <p fontSize={14}>FRI</p>
          </div>
          <div className="w-[calc(100%/7)] text-center">
            <p fontSize={14}>SAT</p>
          </div>
        </div>

        <div className="border border-t-[1px] border-l-[1px] flex flex-wrap">
          {getCalendar()}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
