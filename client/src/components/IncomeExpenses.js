import React, { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  const income = transactions
    .map((t) => t.amount)
    .filter((amt) => amt > 0)
    .reduce((x, y) => x + y, 0);
  //console.log(income);
  const expense = transactions
    .map((t) => t.amount)
    .filter((amt) => amt < 0)
    .reduce((x, y) => x + y, 0);
  return (
    <div className="income-expense">
      <div>
        <h4>Income</h4>
        <p id="money-plus" className="money plus">
          +{income}
        </p>
      </div>
      <div>
        <h4>Expense</h4>
        <p id="mpney-minus" className="money minus">
          -{Math.abs(expense)}
        </p>
      </div>
    </div>
  );
};
