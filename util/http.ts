import axios from "axios";

const dbUrl = "https://rn-expenses-app-be6ff-default-rtdb.firebaseio.com";

export const storeExpense = async (expenseData) => {
  const res = await axios.post(`${dbUrl}/expenses.json`, expenseData);
  const id = res.data.name;
  return id;
};

export const getExpenses = async () => {
  const res = await axios.get(`${dbUrl}/expenses.json`);

  const expenses = [];

  for (const key in res.data) {
    const { amount, date, description } = res.data[key];
    expenses.push({
      id: key,
      amount,
      date: new Date(date),
      description,
    });
  }
  return expenses;
};

export const updateExpense = (id, expenseData) => {
  return axios.put(`${dbUrl}/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
  return axios.delete(`${dbUrl}/expenses/${id}.json`);
};
