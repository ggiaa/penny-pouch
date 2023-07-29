import React from "react";

function budgeting() {
  return (
    <div className="grid grid-cols-3 gap-x-2 h-full">
      <div className="bg-white shadow-md rounded-md h-full p-2 w-full">
        <p className="mb-4">My Budget</p>

        <div className="flex flex-col gap-y-2 px-4">
          <div className="border border-slate-300 rounded-md shadow-md relative overflow-hidden h-16">
            <div className="bg-blue-400 text-sm h-full w-[40%]"></div>
            <div className="absolute top-0 left-0 p-2 flex w-full h-full flex-col justify-center">
              <p>Food</p>
              <p className="text-sm mt-1">Rp220.000/Rp800.000</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md h-full p-2 w-full">
        <p className="mb-4">Saving</p>

        <div className="flex flex-col gap-y-2 px-4">
          <div className="border border-slate-300 rounded-md shadow-md relative overflow-hidden h-16">
            <div className="bg-blue-400 text-sm h-full w-[40%]"></div>
            <div className="absolute top-0 left-0 p-2 flex w-full h-full flex-col justify-center">
              <p>Motorcycle</p>
              <p className="text-sm mt-1">Rp220.000/Rp800.000</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md h-full p-2 w-full">
        <p className="mb-4">Wishlists</p>

        <div>
          <div className="grid grid-cols-12 bg-gray-100 p-2">
            <div className="flex gap-x-1 col-span-8">
              <input type="checkbox" name="bag" value="bag" />
              <label>Bag</label>
            </div>
            <p className="text-right col-span-4">Rp1.000.000</p>
          </div>
          <div className="grid grid-cols-12 p-2">
            <div className="flex gap-x-1 col-span-8">
              <input type="checkbox" name="bag" value="bag" />
              <label>Bag</label>
            </div>
            <p className="text-right col-span-4">Rp1.000.000</p>
          </div>
          <div className="grid grid-cols-12 bg-gray-100 p-2">
            <div className="flex gap-x-1 col-span-8">
              <input type="checkbox" name="bag" value="bag" />
              <label>Bag</label>
            </div>
            <p className="text-right col-span-4">Rp1.000.000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default budgeting;
