"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";

function Calendar() {
  const date = new Date();

  const [dates, setDates] = useState([]);
  const [actualMonth, setActualMonth] = useState();
  const [actualYear, setActualYear] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const getDate = () => {
    setDates([]);
    const arr = [];
    const prevYear = actualMonth == 0 ? actualYear - 1 : actualYear;
    const nextYear = actualMonth == 11 ? actualYear + 1 : actualYear;
    const previousMonth = actualMonth - 1;
    const nextMonth = actualMonth + 1;

    let firstDateOfMonth = new Date(actualYear, actualMonth, 0).getDay();

    let lastDateOfMonth = new Date(actualYear, nextMonth, 0).getDate();
    let lastDayOfMonth = new Date(
      actualYear,
      actualMonth,
      lastDateOfMonth
    ).getDay();
    let lastDateOfPreviousMonth = new Date(
      actualYear,
      actualMonth,
      0
    ).getDate();

    if (firstDateOfMonth < 6) {
      for (
        let i = lastDateOfPreviousMonth - firstDateOfMonth;
        i <= lastDateOfPreviousMonth;
        i++
      ) {
        arr.push(
          moment().set({ Year: prevYear, month: previousMonth, date: i })
        );
      }
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      arr.push(moment().set({ Year: actualYear, month: actualMonth, date: i }));
    }

    for (let i = 1; i < 7 - lastDayOfMonth; i++) {
      arr.push(moment().set({ Year: nextYear, month: nextMonth, date: i }));
    }

    setDates(arr);

    console.log(actualYear);
    console.log(actualMonth);
  };

  const changeToPreviousMonth = () => {
    if (actualMonth - 1 < 0) {
      setActualMonth(11);
      setActualYear(actualYear - 1);
    } else {
      setActualMonth(actualMonth - 1);
    }
    // getDate();
  };

  const changeToNextMonth = () => {
    if (actualMonth + 1 > 11) {
      setActualMonth(0);
      setActualYear(actualYear + 1);
    } else {
      setActualMonth(actualMonth + 1);
    }
  };

  useEffect(() => {
    getDate();
  }, [actualMonth, actualYear]);

  useEffect(() => {
    setActualMonth(date.getMonth());
    setActualYear(date.getFullYear());
    setSelectedDate(moment(date).format("YYYY-MM-DD"));
    setDates([]);
    getDate();
  }, []);

  return (
    <div>
      <div>
        <div>
          <div className="flex justify-between">
            <p className="text-left font-semibold mb-2 text-lg">
              {moment()
                .set({ Year: actualYear, month: actualMonth, date: 1 })
                .format("MMMM YYYY")}
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
            {dates.map((date) => (
              <div
                key={date}
                className={`${
                  moment(date).format("YYYY-MM-DD") == selectedDate
                    ? "bg-blue-200"
                    : ""
                } ${
                  moment(date).get("month") == actualMonth
                    ? "text-black"
                    : "text-slate-400 bg-slate-50"
                }border-r-[1px] border-b-[1px] border w-[calc(100%/7)] h-20 cursor-pointer`}
                onClick={() =>
                  setSelectedDate(moment(date).format("YYYY-MM-DD"))
                }
              >
                <p>{moment(date).format("DD")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
