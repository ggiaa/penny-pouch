import moment from "moment/moment";
import React, { useState } from "react";
import {
  IoIosArrowRoundDown,
  IoIosArrowRoundUp,
  IoIosArrowForward,
} from "react-icons/io";
import { NumericFormat } from "react-number-format";
import DinamicIcon from "../../components/utils/DinamicIcon";
import AddNewTransaction from "../Modal/AddNewTransaction";

function RecentTransaction({ recentTransactions }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState();
  const [transactionData, setTransactionData] = useState();

  const handleEditTransaction = (item) => {
    setModalOpen(true);
    setTransactionData(item);
    // console.log(item);
  };
  return (
    <div>
      <p className="">Recent Transactions</p>
      <div className="divide-y">
        {recentTransactions &&
          recentTransactions.map((item, index) => (
            <div
              className="grid grid-cols-12 text-sm hover:bg-blue-100"
              onClick={() => handleEditTransaction(item)}
              key={index}
            >
              <div
                className={`${
                  item.is_income ? "bg-green-600" : "bg-red-600"
                } rounded-full py-2 w-8 aspect-square my-auto flex items-center justify-center text-white`}
              >
                <DinamicIcon
                  size="text-xl"
                  iconName={item.icon ?? "AiOutlineQuestion"}
                />
              </div>
              <div className="col-span-7 ml-3 py-2">
                <div className="items-center flex gap-x-1">
                  <p className="">{item.category}</p>
                  <IoIosArrowForward />
                  <p className="">{item.sub_category}</p>
                </div>
                <p className="text-xs mt-1">{item.note}</p>
              </div>
              <div className="col-span-4 py-2 text-right group relative overflow-hidden">
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

                <div className="absolute cursor-pointer group-hover:right-0 transition-all duration-500 transform translate-x-0 ease -right-28 bg-red-400 px-4 flex flex-col justify-center h-full top-0">
                  hapus
                </div>
              </div>
            </div>
          ))}
      </div>

      <AddNewTransaction
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        transactionData={transactionData}
      />
    </div>
  );
}

export default RecentTransaction;
