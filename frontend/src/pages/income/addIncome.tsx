import React, { useEffect, useState } from "react";
import { HeaderText } from "../../components/text/HeaderText";
import { TextInput } from "../../components/input/TextInput";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import { NumberInput } from "../../components/input/NumberInput";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerInput from "../../components/input/DatePickerInput";
import { useNavigate, useParams } from "react-router-dom";
import { useAddIncome } from "../../hooks/income/addIncomeHook";
import { useGetIncomeById } from "../../hooks/income/getIncomeHook";
import { useUpdateIncomeById } from "../../hooks/income/updateIncomeHook";
import { HourGlassLoader } from "../../components/loader/HourGlassLoader";

const AddIncome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const { mutateAsync: addIncomeMutateAync } = useAddIncome();
  const { mutateAsync: updateIncomeMutateAsync } = useUpdateIncomeById();

  const { data: incomeData, isLoading: incomeLoading } = useGetIncomeById(
    id,
    !!id
  );

  // Add this useEffect block in your component
  useEffect(() => {
    if (id && incomeData) {
      setTitle(incomeData?.data?.title || "");
      setDescription(incomeData?.data?.description || "");
      setAmount(incomeData?.data?.amount || 0);
      setDate(incomeData?.data?.date || "");
    } else {
      setTitle("");
      setDescription("");
      setAmount(0);
      setDate("");
    }
  }, [id, incomeData]);

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
        if (id && incomeData) {
          await updateIncomeMutateAsync({
            id: incomeData.data.id,
            title: title,
            description: description,
            amount: amount,
            date: date,
          });
          toast.success("Income updated successfully");
        } else {
          await addIncomeMutateAync({
            title: title,
            description: description,
            amount: amount,
            date: date,
          });
          toast.success("Income added successfully");
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
      {incomeLoading ? (
        <HourGlassLoader />
      ) : (
        <div className="py-5 text-center w-full min-h-[90vh]">
          <HeaderText label={id ? "Edit Income" : "Add Income"} />
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
              buttonText={id ? "Edit Income" : "Add Income"}
              onClick={async () => {
                await callAddIncome();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddIncome;
