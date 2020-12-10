import React, { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
export const Transaction = ({ transaction }) => {
  //const sign = transaction.amount < 0 ? "-" : "+";
  const { deleteTransaction } = useContext(GlobalContext);
  return (
    <li>
      {transaction.text}:
      <span className={transaction.amount < 0 ? "minus" : "plus"}>
        {transaction.amount}
        <button
          onClick={() => deleteTransaction(transaction._id)}
          className="delete-btn"
        >
          x
        </button>
      </span>
    </li>
  );
};
