import React, { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const total = transactions
    .map((t) => t.amount)
    .reduce((x, y) => x + y, 0)
    .toFixed(2);
  //console.log(total);
  return (
    <div className="balance">
      <h2>Your Balance</h2>
      <h2 id="balance">{total}</h2>
    </div>
  );
};
