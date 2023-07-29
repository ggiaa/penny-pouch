import React from "react";

function settings() {
  return (
    <div className="grid grid-cols-12 bg-white rounded-md h-full">
      <div className="col-span-3 bg-white border-r border-slate-300 p-2">
        <p className="font-semibold">Settings</p>

        <div className="flex flex-col mt-4">
          <div className="py-2 border-b border-slate-300">
            <p>Accounts</p>
          </div>
          <div className="py-2 border-b border-slate-300">
            <p>Theme</p>
          </div>
          <div className="py-2 border-b border-slate-300">
            <p>Categories</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default settings;
