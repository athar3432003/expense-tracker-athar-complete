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
    <>
      <h4>Your Balance</h4>
      <h1 id="balance">{total}</h1>
    </>
  );
};
