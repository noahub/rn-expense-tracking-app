import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/ExpensesContext";
import { getDateMinusDay } from "../util/date";

const RecentExpenses = ({}) => {
  const context = useContext(ExpensesContext);
  const filteredExpenses = context.expenses.filter((expense) => {
    const today = new Date();
    const date7daysago = getDateMinusDay(today, 7);
    return expense.date > date7daysago;
  });

  return (
    <ExpensesOutput expenses={filteredExpenses} expensesPeriod="Last 7 Days" />
  );
};

export default RecentExpenses;
