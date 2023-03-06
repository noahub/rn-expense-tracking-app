import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/ExpensesContext";

const AllExpenses = ({}) => {
  const context = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={context.expenses}
      expensesPeriod="Total"
      fallbackText={"No Registered Expenses"}
    />
  );
};

export default AllExpenses;
