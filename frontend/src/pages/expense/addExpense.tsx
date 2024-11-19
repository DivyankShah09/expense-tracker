import React, { useState } from "react";
import { HeaderText } from "../../components/text/HeaderText";
import { TextInput } from "../../components/input/TextInput";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import { NumberInput } from "../../components/input/NumberInput";
import DatePickerInput from "../../components/input/DatePickerInput";
import SelectInput from "../../components/input/SelectInput";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useAddExpense } from "./hook/addExpenseHook";

const AddExpense = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const { mutateAsync } = useAddExpense();

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
        const response = await mutateAsync({
          title: title,
          description: description,
          amount: amount,
          date: date,
          category: category,
        });
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
      <div className="my-5 text-center">
        <HeaderText label="Add Expense" />
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
            onChange={(value) => setCategory(value)}
            placeholderText="Select Category"
          />

          <PrimaryButton
            buttonText="Add Expense"
            onClick={async () => {
              await callAddExpense();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AddExpense;
