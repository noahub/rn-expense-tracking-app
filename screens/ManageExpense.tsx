import { useContext, useLayoutEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ExpenseForm from "../components/ExpenseForm";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/ExpensesContext";

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const context = useContext(ExpensesContext);

  const selectedExpense = context.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const cancelHandler = () => {
    navigation.goBack();
  };
  const deleteHandler = () => {
    context.deleteExpense(editedExpenseId);
    navigation.goBack();
  };
  const confirmHandler = ({
    description,
    amount,
    date,
  }: {
    description: string;
    amount: number;
    date: Date;
  }) => {
    if (isEditing) {
      context.updateExpense(editedExpenseId, {
        description,
        amount,
        date,
      });
    } else {
      context.addExpense({
        description,
        amount,
        date,
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />
      <View>
        <Pressable />
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            iconName={"trash"}
            color={GlobalStyles.colors.error500}
            size={32}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
