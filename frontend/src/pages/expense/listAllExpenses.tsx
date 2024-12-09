import { useEffect, useState } from "react";
import SelectInput from "../../components/input/SelectInput";
import { ExpenseTable } from "../../components/table/ExpenseTable";
import { HeaderText } from "../../components/text/HeaderText";
import { useGetExpenseByUserId } from "../../hooks/expense/getExpenseHook";
import SliderInput from "../../components/input/SliderInput";
import DatePickerInput from "../../components/input/DatePickerInput";
import { toast } from "react-toastify";
import { ExpenseCategoryEnum } from "../../enums/expenseCategoryEnum";
import { HourGlassLoader } from "../../components/loader/HourGlassLoader";
import { useDeleteExpense } from "../../hooks/expense/deleteExpenseHook";
import { Expense } from "../../interfaces/Expense";

const ListAllExpenses = () => {
  const userId = localStorage.getItem("userId") || "0";
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filteredExpenseData, setFilteredExpenseData] = useState<Expense[]>([]);
  const { mutateAsync: deleteExpenseMutateAsync } = useDeleteExpense();

  // Get Expense API
  const { data: expenseData, isLoading: expenseLoading } =
    useGetExpenseByUserId(userId, true);

  const start = startDate ? new Date(startDate).getTime() : null; // Start date as timestamp
  const end = endDate
    ? new Date(new Date(endDate).setHours(23, 59, 59, 999) + 1).getTime() // End date set to the end of the day
    : null;

  // Check if start date is after end date
  useEffect(() => {
    let filteredData: any;
    if (start && end && start > end) {
      toast.error("From date cannot be after To date.");
      filteredData = expenseData?.data; // Return empty array or handle as needed
      setFilteredExpenseData(filteredData);
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
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

      setFilteredExpenseData(filteredData);
    }
  }, [expenseData, category, amount, startDate, endDate, start, end]);

  const categories = Object.values(ExpenseCategoryEnum).map((category) =>
    category.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );

  const overallExpenseCategoryData: any[] = [];

  categories.forEach((category) => {
    const pieChartEntry = {
      name: category,
      value: 0,
    };
    expenseData?.data.forEach((expense: Expense) => {
      if (expense.category === category) {
        pieChartEntry.value += expense.amount;
      }
    });
    overallExpenseCategoryData.push(pieChartEntry);
  });

  const handleDelete = async (id: number | undefined) => {
    console.log("id: ", id);

    if (!id) return;

    try {
      await deleteExpenseMutateAsync(id.toString());
      toast.success("Expense deleted successfully!");
      setFilteredExpenseData((prevData) => {
        return prevData.filter((expense: Expense) => expense.id !== id);
      });
    } catch (error) {
      toast.error("Error occured");
    }
  };

  return (
    <>
      {expenseLoading ? (
        // Default values shown
        <HourGlassLoader />
      ) : (
        <div className="py-5 text-center w-full min-h-[90vh]">
          <div className="my-3">
            <HeaderText label="Total Expense per Category" />
            <div className="px-5 flex flex-wrap justify-center gap-4 my-3">
              {overallExpenseCategoryData.map((data, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow-md p-5 w-64 text-center hover:scale-105 transform transition-transform duration-200"
                >
                  <div className="text-lg font-bold text-gray-700">
                    {data.name}
                  </div>
                  <div className="text-2xl font-semibold text-primary mt-2">
                    ${data.value.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <HeaderText label="All Expense" />
          <div className="px-5 flex flex-row gap-5">
            <SelectInput
              value={category}
              onChange={(value) => setCategory(value)}
              placeholderText="Select Category"
              options={ExpenseCategoryEnum}
              divClassName="w-fit"
            />
            <div className="">
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
              expenseAllData={filteredExpenseData} // Use filteredData here
              headerRequired={false}
              colSpan={5}
              updateBtnRequired={true}
              onClick={handleDelete}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ListAllExpenses;
