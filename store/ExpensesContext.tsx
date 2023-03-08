import { createContext, useReducer } from "react";
import { expensesReducer } from "./reducer";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date, id }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

export const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id, expenseData } });
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense,
        setExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};
