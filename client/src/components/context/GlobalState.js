import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
const initialState = {
  transactions: [
    // { id: 1, text: "Flower", amount: -20 },
    // { id: 2, text: "Salary", amount: 300 },
    // { id: 3, text: "Book", amount: -10 },
    // { id: 4, text: "Camera", amount: 150 },
  ],
  error: null,
  loading: true,
};

//create context
export const GlobalContext = createContext(initialState);

//Provider component

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions
  async function deleteTransaction(id) {
    try {
      axios.delete(`/api/v1/transactions/${id}`);

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "DELETE_ERROR",
        payload: err.response.data.error,
      });
    }
  }
  async function getTransactions() {
    try {
      const res = await axios.get("/api/v1/transactions");
      // console.log(res);
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.res.data.error,
      });
    }
  }
  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/v1/transactions", transaction, config);
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        getTransactions,
        error: state.error,
        loading: state.loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
