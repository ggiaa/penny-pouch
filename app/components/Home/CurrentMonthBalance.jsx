import React, { useEffect } from "react";
import useStore from "../../store/store";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { NumericFormat } from "react-number-format";

function CurrentMonthBalance() {
  const modeStore = useStore();

  const currentMonthBalance = useStore((state) => state.currentMonthBalance);

  useEffect(() => {
    modeStore.fetchCurrentMonthBalance();
  }, []);
  return (
    <>
      <div className="bg-white rounded-md p-2 shadow-md text-center flex justify-center flex-col gap-y-1 w-full h-full">
        <p className="text-sm">My Balance</p>
        <p className="font-semibold">Rp2.456.500</p>
      </div>
      <div className="bg-white shadow-md rounded-md p-2 grid grid-cols-2 divide-x divide-slate-300">
        <div className="flex items-center gap-x-1">
          <IoIosArrowRoundDown className="text-3xl text-green-600" />
          <div>
            <p className="text-sm">Income</p>
            <p className="text-green-600">
              <NumericFormat
                value={currentMonthBalance.income}
                displayType={"text"}
                thousandSeparator="."
                decimalSeparator=","
                prefix={"Rp"}
              />
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-1">
          <IoIosArrowRoundUp className="text-3xl text-red-600" />
          <div>
            <p className="text-sm">Expense</p>
            <p className="text-red-600">
              <NumericFormat
                value={currentMonthBalance.expense}
                displayType={"text"}
                thousandSeparator="."
                decimalSeparator=","
                prefix={"Rp"}
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentMonthBalance;
