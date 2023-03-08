import { useContext, useEffect, useState } from "react";
import ErrorOverlay from "../components/ErrorOverlay";
import ExpensesOutput from "../components/ExpensesOutput";
import LoadingOverlay from "../components/LoadingOverlay";
import { ExpensesContext } from "../store/ExpensesContext";
import { getDateMinusDay } from "../util/date";
import { getExpenses } from "../util/http";

const RecentExpenses = ({}) => {
  const context = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const get = async () => {
      setIsFetching(true);
      try {
        const expenses = await getExpenses();
        context.setExpenses(expenses);
      } catch (e) {
        setError("Could not fetch expenses.");
        console.log("Could not get expenses: ", e);
      }
      setIsFetching(false);
    };
    get();
  }, []);

  if (error && !isFetching)
    return <ErrorOverlay message={error} onConfirm={() => setError("")} />;
  if (isFetching) return <LoadingOverlay />;

  const filteredExpenses = context.expenses.filter((expense) => {
    const today = new Date();
    const date7daysago = getDateMinusDay(today, 7);
    return expense.date > date7daysago && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={filteredExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText={"No Expenses Registered in Last 7 Days"}
    />
  );
};

export default RecentExpenses;
