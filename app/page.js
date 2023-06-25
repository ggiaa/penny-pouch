import Image from "next/image";
import {
  IoIosArrowRoundDown,
  IoIosArrowRoundUp,
  IoIosArrowForward,
} from "react-icons/io";

export default function Home() {
  return (
    <div className="h-full p-2 grid grid-cols-12 gap-x-2">
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
          <p>Recent Transactions</p>
          <div className="divide-y">
            {[1, 1, 1, 1, 1, 1, 1].map((item) => (
              <div className="grid grid-cols-12 text-xs py-2">
                <div className="bg-red-600 rounded-full w-8 aspect-square flex items-center justify-center">
                  <IoIosArrowRoundDown className="text-2xl text-white" />
                </div>
                <div className="col-span-7 ml-3">
                  <div className="items-center flex gap-x-1">
                    <p className="font-semibold">Food</p>
                    <IoIosArrowForward />
                    <p className="font-semibold">Lunch</p>
                  </div>
                  <p>Nasi Goreng</p>
                </div>
                <div className="col-span-4 text-right">
                  <p className="text-red-500 font-semibold">Rp.15.000</p>
                  <p className="font-thin">16 Jun(Fri)</p>
                </div>
              </div>
            ))}
            {/* <div className="grid grid-cols-12 items-center text-xs">
              <div className="bg-red-600 col-span-1 rounded-full aspect-square flex items-center justify-center">
                <IoIosArrowRoundDown className="text-2xl text-white" />
              </div>
              <div className="col-span-7 ml-2">
                <div className="items-center flex gap-x-1">
                  <p>Food</p>
                  <IoIosArrowForward />
                  <p>Lunch</p>
                </div>
                <p>Nasi Goreng</p>
              </div>
              <div className="col-span-4 text-right">
                <p>Rp.15.000</p>
                <p>16 Jun(Fri)</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="col-span-7 grid grid-rows-6 gap-y-2">
        <div className="bg-sky-300 shadow-md row-span-2 grid grid-cols-2">
          <div>1</div>
          <div>2</div>
        </div>
        <div className="bg-sky-300 shadow-md row-span-4">card 1</div>
      </div>
      <div className="col-span-2 grid grid-rows-6 gap-y-2">
        <div className="bg-sky-300 shadow-md row-span-3">card 1</div>
        <div className="bg-sky-300 shadow-md row-span-3">card 1</div>
      </div>
    </div>
  );
}
