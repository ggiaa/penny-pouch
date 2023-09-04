"use client";
import React, { useState } from "react";
import Accounts from "../components/Settings/Accounts";

function settings() {
  const [selectedOption, setSelectedOption] = useState(0);
  const [options, setOptions] = useState(["Accounts", "Theme", "Categories"]);

  return (
    <div className="bg-white h-full flex divide-x">
      <div className="w-1/5">
        <p className="font-semibold px-2 pt-2">Settings</p>
        <div className="flex flex-col mt-4">
          {options.map((option, i) => {
            return (
              <div
                key={i}
                className={`py-3 px-2 border-b border-slate-300 cursor-pointer ${
                  selectedOption == i ? "setting-selected-option" : ""
                } ${selectedOption !== i ? "hover:bg-sky-100" : ""}`}
                onClick={() => setSelectedOption(i)}
              >
                <p>{option}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="h-full w-full">
          {options[selectedOption] == "Accounts" && <Accounts />}
        </div>
        {/* <div className="w-1/2 overflow-auto"></div>
        <div>3</div> */}
      </div>
    </div>
    // <div className="flex bg-white rounded-md h-[95%]">
    //   <div className="w-1/5 bg-white border-r border-slate-300">
    //     <p className="font-semibold px-2 pt-2">Settings</p>

    //     <div className="flex flex-col mt-4">
    //       {options.map((option, i) => {
    //         return (
    //           <div
    //             key={i}
    //             className={`py-3 px-2 border-b border-slate-300 cursor-pointer ${
    //               selectedOption == i ? "setting-selected-option" : ""
    //             } ${selectedOption !== i ? "hover:bg-sky-100" : ""}`}
    //             onClick={() => setSelectedOption(i)}
    //           >
    //             <p>{option}</p>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    //   <div className="bg-purple-500 h-full overflow-auto flex flex-1">
    //     <div className="m-2 bg-orange-400 h-full w-full">
    //       <div>1</div>
    //     </div>
    //     {/* {options[selectedOption] == "Accounts" && <Accounts />} */}
    //   </div>
    // </div>
  );
}

export default settings;
