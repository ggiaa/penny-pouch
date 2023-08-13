import moment from "moment/moment";
import React from "react";
import {
  IoIosArrowRoundDown,
  IoIosArrowRoundUp,
  IoIosArrowForward,
} from "react-icons/io";
import { NumericFormat } from "react-number-format";
import DinamicIcon from "../../components/utils/DinamicIcon";

function RecentTransaction({ recentTransactions }) {
  return (
    <div>
      <p className="">Recent Transactions</p>
      <div className="divide-y">
        {recentTransactions &&
          recentTransactions.map((item, index) => (
            <div className="grid grid-cols-12 text-sm py-2" key={index}>
              <div className="bg-red-600 rounded-full w-8 aspect-square my-auto flex items-center justify-center">
                <DinamicIcon
                  size="text-xl"
                  iconName={item.icon ?? "AiOutlineQuestion"}
                />
              </div>
              <div className="col-span-7 ml-3">
                <div className="items-center flex gap-x-1">
                  <p className="">{item.category}</p>
                  <IoIosArrowForward />
                  <p className="">{item.sub_category}</p>
                </div>
                <p className="text-xs mt-1">{item.note}</p>
              </div>
              <div className="col-span-4 text-right">
                <p className="text-red-500">
                  <NumericFormat
                    value={item.amount}
                    displayType={"text"}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix={"Rp"}
                  />
                </p>
                <p className="text-xs mt-1">
                  {moment(item.date).calendar(null, {
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    nextWeek: "dddd",
                    lastDay: "[Yesterday]",
                    lastWeek: "D MMM (ddd)",
                    sameElse: "D MMM (ddd)",
                  })}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecentTransaction;
