export function expensesReducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case "UPDATE":
      const itemIndex = state.findIndex((item) => {
        item.id === action.payload.id;
      });
      const updatableExpense = state[itemIndex];
      const updatedItem = {
        ...updatableExpense,
        ...action.payload.expenseData,
      };
      const updatedExpenses = [...state];
      updatedExpenses[itemIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

type State = Array<Expense>;

type Action =
  | { type: "ADD"; payload: Expense }
  | {
      type: "UPDATE";
      payload: { id: Expense["id"]; expenseData: Omit<Expense, "id"> };
    }
  | {
      type: "DELETE";
      payload: Expense["id"];
    };
