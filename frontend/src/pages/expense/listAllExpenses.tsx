import { useState } from "react";
import SelectInput from "../../components/input/SelectInput";
import { ExpenseTable } from "../../components/table/ExpenseTable";
import { HeaderText } from "../../components/text/HeaderText";
import { useGetExpense } from "../../hooks/getExpenseHook";
import SliderInput from "../../components/input/SliderInput";

const ListAllExpenses = () => {
  const userId = localStorage.getItem("userId") || "0";
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  // Get Expense API
  const { data: expenseData, isLoading: expenseLoading } = useGetExpense(
    userId,
    true
  );

  // Filter and sort data
  const filteredData = expenseData?.data
    ?.filter((expense) => {
      const formattedCategory = category
        ? category
            .replace(/_/g, " ") // Replace underscores with spaces
            .replace(/\b\w/g, (char: any) => char.toUpperCase())
        : null;

      return (
        (!formattedCategory || expense.category === formattedCategory) && // Filter by category if selected
        (Number(amount) === 0 || expense.amount <= amount) // Filter by max amount
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending

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
          <div className="py-2">
            <h1 className="text-primary font-semibold text-lg text-left w-fit">
              Filters :
            </h1>
            <SliderInput
              label="Amount"
              value={amount}
              minValue={0}
              maxValue={1000}
              onChange={(value: number) => setAmount(value)}
            />
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
