import React, { useEffect, useState } from "react";
import { HeaderText } from "../../components/text/HeaderText";
import { TextInput } from "../../components/input/TextInput";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import { NumberInput } from "../../components/input/NumberInput";
import DatePickerInput from "../../components/input/DatePickerInput";
import SelectInput from "../../components/input/SelectInput";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
  useAddExpense,
  useAddRecurringExpense,
} from "../../hooks/expense/addExpenseHook";
import { ExpenseCategoryEnum } from "../../enums/expenseCategoryEnum";
import { CheckBoxInput } from "../../components/input/CkeckBoxInput";
import { ExpenseFrequencyEnum } from "../../enums/expenseFrequencyEnum";
import { useNavigate, useParams } from "react-router-dom";
import { useGetExpenseById } from "../../hooks/expense/getExpenseHook";
import { useUpdateExpenseById } from "../../hooks/expense/updateExpenseHook";
import { HourGlassLoader } from "../../components/loader/HourGlassLoader";

const AddExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<string>("");
  const { mutateAsync: addExpenseMutateAsync } = useAddExpense();
  const { mutateAsync: addRecurringExpenseMutateAsync } =
    useAddRecurringExpense();
  const { mutateAsync: updateExpenseMutateAsync } = useUpdateExpenseById();

  const { data: expenseData, isLoading: expenseLoading } = useGetExpenseById(
    id,
    !!id
  );

  // Add this useEffect block in your component
  useEffect(() => {
    if (id && expenseData) {
      setTitle(expenseData?.data?.title || "");
      setDescription(expenseData?.data?.description || "");
      setAmount(expenseData?.data?.amount || 0);
      setDate(expenseData?.data?.date || "");
      setCategory(
        expenseData?.data?.category
          .toLowerCase() // Convert the string to lowercase
          .replace(/\s+/g, "_") || ""
      );
    } else {
      setTitle("");
      setDescription("");
      setAmount(0);
      setDate("");
      setCategory("");
    }
  }, [id, expenseData]);

  const validate = () => {
    if (!title) {
      toast.error("Title is required");
      return false;
    }

    if (!description) {
      toast.error("Description is required");
      return false;
    }

    if (amount <= 0) {
      toast.error("Amount should be greater than 0");
      return false;
    }

    if (!date) {
      toast.error("Date is required");
      return false;
    }

    if (!category) {
      toast.error("Category is required");
      return false;
    }

    return true;
  };

  const callAddExpense = async () => {
    if (validate()) {
      try {
        if (id && expenseData) {
          await updateExpenseMutateAsync({
            id: expenseData.data.id,
            title: title,
            description: description,
            amount: amount,
            date: date,
            category: category,
          });
          toast.success("Expense updated successfully");
        } else {
          if (isRecurring) {
            await addRecurringExpenseMutateAsync({
              title: title,
              description: description,
              amount: amount,
              date: date,
              category: category,
              frequency: frequency,
            });
            toast.success("Recurring expense added successfully");
          } else {
            await addExpenseMutateAsync({
              title: title,
              description: description,
              amount: amount,
              date: date,
              category: category,
            });
            toast.success("Expense added successfully");
          }
        }
        navigate("/dashboard");
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.statusText);
        } else {
          toast.error("Unkonw error occured !!");
        }
      }
    }
  };

  return (
    <>
      {expenseLoading ? (
        <HourGlassLoader />
      ) : (
        <div className="py-5 text-center w-full min-h-[90vh]">
          <HeaderText label={id ? "Edit Expense" : "Add Expense"} />
          <div className="w-1/3 text-center p-2 mx-auto my-2">
            <TextInput
              label="Title"
              labelPosition="top"
              placeholderText="Title"
              value={title}
              onChange={(value) => setTitle(value)}
              type="string"
            />
            <TextInput
              label="Description"
              labelPosition="top"
              placeholderText="Description"
              value={description}
              onChange={(value) => setDescription(value)}
              type="string"
            />
            <NumberInput
              label="Amount"
              labelPosition="top"
              placeholderText="Amount"
              value={amount}
              onChange={(value) => setAmount(value)}
              type="number"
            />

            <DatePickerInput
              label="Date"
              labelPosition="top"
              value={date}
              onChange={(value) => setDate(value)}
            />

            <SelectInput
              label="Category"
              labelPosition="top"
              value={category}
              options={ExpenseCategoryEnum}
              placeholderText="Select Category"
              onChange={(value) => setCategory(value)}
            />

            {!id && (
              <CheckBoxInput
                label="Recurring Expense"
                value={isRecurring}
                onClick={(value) => setIsRecurring(value)}
              />
            )}

            {isRecurring ? (
              <SelectInput
                label="Frequency"
                labelPosition="top"
                value={frequency}
                options={ExpenseFrequencyEnum}
                placeholderText="Select Frequency"
                onChange={(value) => setFrequency(value)}
              />
            ) : (
              <></>
            )}

            <PrimaryButton
              buttonText={id ? "Edit Expense" : "Add Expense"}
              onClick={async () => {
                await callAddExpense();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddExpense;
