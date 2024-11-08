import React, { useState } from "react";
import { HeaderText } from "../../components/text/HeaderText";
import { TextInput } from "../../components/input/TextInput";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import { NumberInput } from "../../components/input/NumberInput";
import { useAddIncome } from "./hook/addIncomeHook";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerInput from "../../components/input/DatePickerInput";

const AddIncome = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const { mutateAsync } = useAddIncome();

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
    return true;
  };

  const callAddIncome = async () => {
    if (validate()) {
      try {
        const response = await mutateAsync({
          title: title,
          description: description,
          amount: amount,
          date: date,
        });
        console.log(response);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.statusText);
        } else {
          toast.error("Unkonw error occured !!");
        }
        // navigate based on the response status code
      }
    }
  };
  return (
    <>
      <div className="my-5 text-center w-full">
        <HeaderText label="Add Income" />
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

          <PrimaryButton
            buttonText="Add Income"
            onClick={async () => {
              await callAddIncome();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AddIncome;
