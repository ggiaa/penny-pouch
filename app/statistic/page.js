import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function statistic() {
  return (
    <div className="w-full h-full flex gap-x-4">
      <div className="w-[72%] bg-white rounded-md p-4 flex flex-col">
        <div className="mt-1 mb-4 text-lg flex justify-between">
          <p>January 2023</p>{" "}
          <div className="w-1/12 flex justify-end">
            <AiOutlineLeft />
            <AiOutlineRight />{" "}
          </div>
        </div>
        <div className="h-full">
          <div className="border-l border-t w-full overflow-hidden flex flex-wrap h-full">
            {(() => {
              const arr = [];
              for (let i = 0; i < 42; i++) {
                arr.push(
                  <div className="border-b border-r border-slate-300 w-[calc(100%/7)]">
                    14
                  </div>
                );
              }
              return arr;
            })()}
          </div>
        </div>
        <div className="mt-2 flex justify-center gap-x-4">
          <div className="flex gap-x-1">
            <input type="radio" name="statistic" value="calendar" />
            <label>Calendar</label>
          </div>
          <div className="flex gap-x-1">
            <input type="radio" name="statistic" value="pie" />
            <label>Pie</label>
          </div>
        </div>
      </div>
      <div className="flex-grow bg-white"></div>
    </div>
  );
}

export default statistic;
