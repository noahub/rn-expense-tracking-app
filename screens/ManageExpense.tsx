import { useContext, useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ErrorOverlay from "../components/ErrorOverlay";
import ExpenseForm from "../components/ExpenseForm";
import IconButton from "../components/IconButton";
import LoadingOverlay from "../components/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/ExpensesContext";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const context = useContext(ExpensesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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
  const deleteHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      context.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense.");
      setIsSubmitting(false);
    }
  };
  const confirmHandler = async ({
    description,
    amount,
    date,
  }: {
    description: string;
    amount: number;
    date: Date;
  }) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        context.updateExpense(editedExpenseId, {
          description,
          amount,
          date,
        });
        await updateExpense(editedExpenseId, {
          description,
          amount,
          date,
        });
      } else {
        const id = await storeExpense({ description, amount, date });
        context.addExpense({
          id,
          description,
          amount,
          date,
        });
      }
      navigation.goBack();
    } catch (e) {
      setError("Could not save data");
      setIsSubmitting(false);
    }
  };

  if (error && !isSubmitting)
    return <ErrorOverlay message={error} onConfirm={() => setError("")} />;
  if (isSubmitting) return <LoadingOverlay />;

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
