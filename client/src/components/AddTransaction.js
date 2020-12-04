import React, { useState, useContext } from "react";
import { GlobalContext } from "./context/GlobalState";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const { addTransaction, transactions } = useContext(GlobalContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount !== 0 && text.length > 0) {
      addTransaction({
        text,
        amount: Number(amount),
        id: transactions.length + 1,
      });
      setAmount(0);
      setText("");
    }
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            (negative - expense, positive - income)
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Enter amount"
          />
        </div>
        <button className="btn">Add Transaction</button>
      </form>
    </>
  );
};
