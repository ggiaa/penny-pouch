import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Calendar from "../components/Statistic/calendar";

function statistic() {
  return (
    <div className="w-full h-full flex gap-x-4">
      <div className="w-[72%] bg-white rounded-md p-4 flex flex-col">
        <Calendar />
      </div>
      <div className="flex-grow">
        <div className="text-sm bg-white p-2 rounded">
          <p className="mb-1 font-semibold ">Today (19 Jan)</p>
          {[1, 1, 1, 1].map((e) => (
            <div className="justify-between flex font-light pl-4 mb-1">
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
