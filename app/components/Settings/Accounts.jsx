import React, { useEffect, useState } from "react";

import DinamicIcon from "../utils/DinamicIcon";
import useStore from "../../store/store";
import { NumericFormat } from "react-number-format";

function Accounts() {
  const [accountName, setAccountName] = useState("");
  const [accountBalance, setAccountBalance] = useState();
  const [accountId, setAccountId] = useState(null);
  const [pinnedEditMode, setpinnedEditMode] = useState(false);
  const [pinnedAcc, setPinnedAcc] = useState();
  const [unpinnedAcc, setUnpinnedAcc] = useState();

  const modeStore = useStore();

  const accounts = useStore((state) => state.accounts);
  const pinnedAccounts = accounts.filter((item) => item.pinned);
  const unpinnedAccounts = accounts.filter((item) => !item.pinned);

  // console.log(pinnedAcc);
  const handleDelete = async (id) => {
    await modeStore.deleteAccounts(id);
  };

  const handleSave = async () => {
    await modeStore.saveAccount(
      { accountName, accountBalance, accountId },
      accountId ? "edit" : "add"
    );
    setAccountName("");
    setAccountBalance("");
    setAccountId(null);
  };

  const editAccount = async (item) => {
    setAccountName(item.account_name);
    setAccountBalance(item.amount);
    setAccountId(item.id);
  };

  const handlePinnedEditMode = () => {
    setpinnedEditMode(!pinnedEditMode);
  };

  const handleUnpin = (item) => {
    setPinnedAcc(pinnedAcc.filter((acc) => acc.id != item.id));
    setUnpinnedAcc([...unpinnedAcc, item]);
  };
  const handlePin = (item) => {
    setUnpinnedAcc(unpinnedAcc.filter((acc) => acc.id != item.id));
    setPinnedAcc([...pinnedAcc, item]);
  };

  const handleSavePinned = async () => {
    setpinnedEditMode(!pinnedEditMode);
    await modeStore.savePinnedAccounts(pinnedAcc, unpinnedAcc);
  };

  useEffect(() => {
    setPinnedAcc(
      accounts
        .filter((item) => item.pinned)
        .sort((a, b) => a.pinned_order - b.pinned_order)
    );
    setUnpinnedAcc(accounts.filter((item) => !item.pinned));
  }, [accounts]);

  // console.log(accounts);
  useEffect(() => {
    modeStore.fetchAccounts();
  }, []);

  return (
    <div className="grid grid-cols-3 divide-x h-full w-full p-4">
      <div className="col-span-2 h-full pr-2 overflow-auto">
        <div className="mb-2">
          <div className="flex justify-between">
            <p className="font-medium text-lg mb-2">pinned account</p>
            {!pinnedEditMode ? (
              <button
                className="bg-blue-600 rounded py-2 text-slate-50 font-medium px-2"
                onClick={handlePinnedEditMode}
              >
                Set Pinned Accounts
              </button>
            ) : (
              <button
                className="bg-red-600 rounded py-2 text-slate-50 font-medium px-4"
                onClick={handleSavePinned}
              >
                Save
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {pinnedAcc?.map((item, i) => (
              <div className="bg-sky-200 p-2 rounded-md" key={i}>
                <div className="flex">
                  <div
                    className={`bg-green-600 rounded-full w-10 aspect-square my-auto flex items-center justify-center text-white`}
                  >
                    <DinamicIcon
                      size="text-2xl"
                      // iconName={item.icon ?? "AiOutlineQuestion"}
                      iconName="BiMoney"
                    />
                  </div>
                  <div className="ml-4 flex-1 text-sm">
                    <p>{item.account_name}</p>
                    <p>
                      <NumericFormat
                        value={item.amount}
                        displayType={"text"}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix={"Rp"}
                      />
                    </p>
                  </div>
                  <div className="h-full cursor-pointer flex">
                    {pinnedEditMode ? (
                      <div onClick={() => handleUnpin(item)}>
                        <DinamicIcon
                          size="text-xl"
                          iconName="AiTwotonePushpin"
                        />
                      </div>
                    ) : (
                      <>
                        <div onClick={() => editAccount(item)}>
                          <DinamicIcon
                            size="text-xl"
                            iconName="AiOutlineEdit"
                          />
                        </div>
                        <div onClick={() => handleDelete(item.id)}>
                          <DinamicIcon
                            size="text-xl"
                            iconName="AiOutlineDelete"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-2" />
        <div className="grid grid-cols-3 gap-2">
          {unpinnedAcc?.map((item, i) => (
            <div className="bg-sky-200 p-2 rounded-md" key={i}>
              <div className="flex">
                <div
                  className={`bg-green-600 rounded-full w-10 aspect-square my-auto flex items-center justify-center text-white`}
                >
                  <DinamicIcon size="text-2xl" iconName="BiMoney" />
                </div>
                <div className="ml-4 flex-1 text-sm">
                  <p>{item.account_name}</p>
                  <p>
                    <NumericFormat
                      value={item.amount}
                      displayType={"text"}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix={"Rp"}
                    />
                  </p>
                </div>
                <div className="h-full cursor-pointer flex">
                  {pinnedEditMode ? (
                    <div onClick={() => handlePin(item)}>
                      <DinamicIcon size="text-xl" iconName="AiOutlinePushpin" />
                    </div>
                  ) : (
                    <>
                      <div onClick={() => editAccount(item)}>
                        <DinamicIcon size="text-xl" iconName="AiOutlineEdit" />
                      </div>
                      <div onClick={() => handleDelete(item.id)}>
                        <DinamicIcon
                          size="text-xl"
                          iconName="AiOutlineDelete"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <p className="text-center mb-4 text-xl">Add / Edit Account</p>
        <div className="flex flex-col gap-y-3">
          <input
            type="text"
            placeholder="Account Name"
            className="input-style"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
          <NumericFormat
            placeholder="Account Balance"
            className="input-style"
            value={accountBalance}
            onValueChange={(values) => setAccountBalance(values.value)}
            displayType={"input"}
            thousandSeparator="."
            decimalSeparator=","
            prefix={"Rp"}
          />
          <div className="flex justify-end gap-x-4">
            <button
              className="bg-red-600 rounded py-2 text-slate-50 font-medium w-24"
              // onClick={handleSave}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 rounded py-2 text-slate-50 font-medium w-24"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div className="grid grid-cols-2 divide-x p-2 h-full bg-purple-300">
    //   <div className="pr-2 bg-orange-300">
    //     <p className="mb-4">Your Accounts</p>
    //     <div className="bg-red-200 flex-1 h-full">
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //       <p>1</p>
    //     </div>
    //     {/* <div className="flex flex-wrap flex-1 bg-lime-300 overflow-auto m-2 p-2">
    //       {accounts.map((item, i) => (
    //         <div className="bg-sky-200 p-2 rounded-md" key={i}>
    //           <div className="flex">
    //             <div
    //               className={`bg-green-600 rounded-full w-10 aspect-square my-auto flex items-center justify-center text-white`}
    //             >
    //               <DinamicIcon
    //                 size="text-2xl"
    //                 // iconName={item.icon ?? "AiOutlineQuestion"}
    //                 iconName="BiMoney"
    //               />
    //             </div>
    //             <div className="ml-4 flex-1">
    //               <p>Cash</p>
    //               <p>Rp250.000</p>
    //             </div>
    //             <div className="h-full cursor-pointer">
    //               <DinamicIcon
    //                 size="text-xl"
    //                 // iconName={item.icon ?? "AiOutlineQuestion"}
    //                 iconName="AiFillSetting"
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div> */}
    //   </div>
    //   <div className="pl-2">text</div>
    // </div>
  );
}

export default Accounts;
