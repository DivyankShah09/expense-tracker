import { useState } from "react";
import SelectInput from "../../components/input/SelectInput";
import { ExpenseTable } from "../../components/table/ExpenseTable";
import { HeaderText } from "../../components/text/HeaderText";
import { useGetExpense } from "../../hooks/getExpenseHook";
import SliderInput from "../../components/input/SliderInput";
import DatePickerInput from "../../components/input/DatePickerInput";
import { toast, ToastContainer } from "react-toastify";

const ListAllExpenses = () => {
  const userId = localStorage.getItem("userId") || "0";
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Get Expense API
  const { data: expenseData, isLoading: expenseLoading } = useGetExpense(
    userId,
    true
  );

  const start = startDate ? new Date(startDate).getTime() : null; // Start date as timestamp
  const end = endDate
    ? new Date(new Date(endDate).setHours(23, 59, 59, 999) + 1).getTime() // End date set to the end of the day
    : null;

  let filteredData;

  // Check if start date is after end date
  if (start && end && start > end) {
    toast.error("From date cannot be after To date.");
    filteredData = expenseData?.data; // Return empty array or handle as needed
  } else {
    // Filter and sort data
    filteredData = expenseData?.data
      ?.filter((expense) => {
        const formattedCategory = category
          ? category
              .replace(/_/g, " ") // Replace underscores with spaces
              .replace(/\b\w/g, (char: any) => char.toUpperCase())
          : null;

        const expenseDate = new Date(expense.date).getTime(); // Use the original expense date timestamp

        return (
          (!formattedCategory || expense.category === formattedCategory) && // Filter by category
          (Number(amount) === 0 || expense.amount <= amount) && // Filter by max amount
          (!start || expenseDate >= start) && // Filter by start date
          (!end || expenseDate <= end) // Filter by end date (inclusive)
        );
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } // Sort by date descending}

  return (
    <>
      <div className="my-5 text-center">
        <HeaderText label="All Expense" />
        <div className="px-5 flex flex-row gap-5">
          <SelectInput
            label="Sort By:"
            labelPosition="top"
            value={category}
            onChange={(value) => setCategory(value)}
            placeholderText="Select Category"
            divClassName="w-fit"
          />
          <div className="">
            <h1 className="text-primary font-semibold text-lg text-left w-fit">
              Filters :
            </h1>
            <div className="flex flex-row gap-2">
              <SliderInput
                label="Amount"
                value={amount}
                minValue={0}
                maxValue={1000}
                onChange={(value: number) => setAmount(value)}
              />
              <div className="flex flex-row">
                <label className="block text-lg font-medium h-12 m-2 p-2">
                  From
                </label>
                <DatePickerInput
                  labelPosition="top"
                  value={startDate}
                  onChange={(value) => setStartDate(value)}
                />
              </div>
              <div className="flex flex-row">
                <label className="block text-lg font-medium h-12 m-2 p-2">
                  To
                </label>
                <DatePickerInput
                  labelPosition="top"
                  value={endDate}
                  onChange={(value) => setEndDate(value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 py-1">
          <ExpenseTable
            expenseAllData={filteredData} // Use filteredData here
            headerRequired={false}
            colSpan={5}
          />
        </div>
      </div>
    </>
  );
};

export default ListAllExpenses;
