import { useNavigate, useParams } from "react-router-dom";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import DatePickerInput from "../../components/input/DatePickerInput";
import { NumberInput } from "../../components/input/NumberInput";
import SelectInput from "../../components/input/SelectInput";
import { TextInput } from "../../components/input/TextInput";
import { HourGlassLoader } from "../../components/loader/HourGlassLoader";
import { HeaderText } from "../../components/text/HeaderText";
import { useEffect, useState } from "react";
import { useGetRecurringExpenseById } from "../../hooks/recurringexpense/getRecurringExpenseHook";
import { ExpenseCategoryEnum } from "../../enums/expenseCategoryEnum";
import { ExpenseFrequencyEnum } from "../../enums/expenseFrequencyEnum";
import { toast } from "react-toastify";
import { useUpdateRecurringExpenseById } from "../../hooks/recurringexpense/updateRecurringExpenseHook";

const UpdateRecurringExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [nextDate, setNextDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");

  const { mutateAsync: updateRecurringMutateAsync } =
    useUpdateRecurringExpenseById();
  const { data: recurringExpenseData, isLoading: recurringExpenseLoading } =
    useGetRecurringExpenseById(id, !!id);

  useEffect(() => {
    if (id && recurringExpenseData) {
      console.log("recurring expense", recurringExpenseData.data);
      console.log("recurring title", recurringExpenseData.data.title);

      setTitle(recurringExpenseData?.data?.title || "");
      setDescription(recurringExpenseData?.data?.description || "");
      setAmount(recurringExpenseData?.data?.amount || 0);
      setNextDate(recurringExpenseData?.data?.date || "");
      setCategory(recurringExpenseData?.data?.category || "");
      setFrequency(recurringExpenseData.data.frequency || "");
    } else {
      setTitle("");
      setDescription("");
      setAmount(0);
      setNextDate("");
      setCategory("");
      setFrequency("");
    }
  }, [id, recurringExpenseData]);

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

    if (!nextDate) {
      toast.error("Date is required");
      return false;
    }

    if (!category) {
      toast.error("Category is required");
      return false;
    }

    if (!frequency) {
      toast.error("Frequency is required");
      return false;
    }

    return true;
  };

  const callEditRecurringExpense = async () => {
    if (validate()) {
      await updateRecurringMutateAsync({
        id: recurringExpenseData?.data.id,
        title: title,
        description: description,
        amount: amount,
        date: nextDate,
        frequency: frequency,
        category: category,
      });
      toast.success("Recurring expense updated successfully");
    }
    navigate("/dashboard");
  };

  return (
    <>
      {recurringExpenseLoading ? (
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
              label="Next Date"
              labelPosition="top"
              value={nextDate}
              onChange={(value) => setNextDate(value)}
            />

            <SelectInput
              label="Category"
              labelPosition="top"
              value={category}
              options={ExpenseCategoryEnum}
              placeholderText="Select Category"
              onChange={(value) => setCategory(value)}
            />

            <SelectInput
              label="Frequency"
              labelPosition="top"
              value={frequency}
              options={ExpenseFrequencyEnum}
              placeholderText="Select Frequency"
              onChange={(value) => setFrequency(value)}
            />

            <PrimaryButton
              buttonText="Edit Recurring Expense"
              onClick={async () => {
                await callEditRecurringExpense();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateRecurringExpense;
