import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import Button from "./Button";
import Input from "./Input";

const ExpenseForm = ({ onCancel, onSubmit, submitLabel, defaultValues }) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (inputName, enteredValue) => {
    setInputs((prevInputVals) => ({
      ...prevInputVals,
      [inputName]: { value: enteredValue, isValid: true },
    }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionValid = expenseData.description.trim().length > 0;

    if (amountValid && dateValid && descriptionValid) {
      onSubmit(expenseData);
    } else {
      setInputs((prevInputs) => ({
        amount: { value: prevInputs.amount.value, isValid: amountValid },
        date: { value: prevInputs.date.value, isValid: dateValid },
        description: {
          value: prevInputs.description.value,
          isValid: descriptionValid,
        },
      }));
    }
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          inputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs["amount"].value,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          inputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs["date"].value,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        inputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs["description"].value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          There's an issue with your expense data. Please review and fix.
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  title: {
    fontSize: 24,
    marginVertical: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: GlobalStyles.colors.accent500,
  },
  inputsRow: {
    flexDirection: "row",
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginVertical: 24,
  },
  button: {
    minWidth: 120,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});

export default ExpenseForm;
