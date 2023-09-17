import React, { useEffect } from "react";
import useStore from "../../store/store";
import { NumericFormat } from "react-number-format";

function PinnedAccounnts() {
  const modeStore = useStore();

  const accounts = useStore((state) => state.accounts);
  const pinnedAccounts = accounts
    .filter((acc) => acc.pinned)
    .sort((a, b) => {
      a.pinned_order - b.pinned_order;
    });

  console.log(pinnedAccounts);

  useEffect(() => {
    modeStore.fetchAccounts();
  }, []);
  return (
    <div>
      <p className="mb-4">Accounts</p>
      {pinnedAccounts.map((account) => (
        <div
          className="text-sm bg-sky-300 rounded-md p-2 mb-2"
          key={account.id}
        >
          <p>{account.account_name}</p>
          <p className="text-right">
            <NumericFormat
              value={account.amount}
              displayType={"text"}
              thousandSeparator="."
              decimalSeparator=","
              prefix={"Rp"}
            />
          </p>
        </div>
      ))}
    </div>
  );
}

export default PinnedAccounnts;
