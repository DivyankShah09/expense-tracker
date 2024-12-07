import { ExpenseCategoryYearlyBarChart } from "../../components/chart/ExpenseCategoryYearlyBarChart";
import { IncomeExpenseYearlyBarChart } from "../../components/chart/IncomeExpenseYearlyBarChart";
import { ExpenseTable } from "../../components/table/ExpenseTable";
import { IncomeTable } from "../../components/table/IncomeTable";
import { SubHeaderText } from "../../components/text/SubHeaderText";
import { ExpenseCategoryEnum } from "../../enums/expenseCategoryEnum";
import {
  useGetExpenseByMonthCategory,
  useGetExpenseByYear,
} from "../../hooks/getExpenseHook";
import { useGetIncomeByYear } from "../../hooks/getIncomeHook";
import DatePickerInput from "../../components/input/DatePickerInput";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ExpenseCategoryPieChart from "../../components/chart/ExpenseCategoryPieChart";
import { HourGlassLoader } from "../../components/loader/HourGlassLoader";
import { Expense } from "../../interfaces/Expense";
import { Income } from "../../interfaces/Income";
import {
  aggregateDataByMonth,
  calculateTotal,
  filterDataByDateRange,
} from "../../utils/data-filter-util";
import {
  generateExpenseCategoryPieChartData,
  generateIncomeExpenseData,
  generateMonthlyExpenseData,
} from "../../utils/chart-data-util";

const Dashboard = () => {
  const userId = localStorage.getItem("userId") || "0";
  const userName = localStorage.getItem("name") || " ";

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const start = startDate ? new Date(startDate).getTime() : null; // Start date as timestamp
  const end = endDate
    ? new Date(new Date(endDate).setHours(23, 59, 59, 999) + 1).getTime() // End date set to the end of the day
    : null;

  const categories = Object.values(ExpenseCategoryEnum).map((category) =>
    category.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );

  // Get Income api
  const { data: incomeData, isLoading: incomeLoading } = useGetIncomeByYear(
    userId,
    new Date().getFullYear().toString(),
    true
  );

  // Get Expense api
  const { data: expenseData, isLoading: expenseLoading } = useGetExpenseByYear(
    userId,
    new Date().getFullYear().toString(),
    true
  );

  // Get Expense by month and category api
  const {
    data: expenseDataByMonthCategory,
    isLoading: expenseMonthCategoryLoading,
  } = useGetExpenseByMonthCategory(
    userId,
    new Date().getFullYear().toString(),
    true,
    startDate,
    endDate
  );

  // Filtering Income Data
  let filteredIncomeData: Income[] | undefined = incomeData?.data;
  let filteredExpenseData: Expense[] | undefined = expenseData?.data;

  // UseEffect to handle validation of start and end dates
  useEffect(() => {
    if (start && end && start >= end) {
      toast.error("From date cannot be after To date.");
    }
  }, [start, end]);

  if (start && end && start < end) {
    filteredIncomeData = filterDataByDateRange(incomeData?.data, start, end);
    filteredExpenseData = filterDataByDateRange(expenseData?.data, start, end);
  } else {
    // Handle the case where the date range is invalid, e.g., use the full data or do nothing
    filteredIncomeData = incomeData?.data;
    filteredExpenseData = expenseData?.data;
  }

  // Aggregation for Monthly Income and Expense
  const monthlyIncomeSum = aggregateDataByMonth(filteredIncomeData || []);
  const monthlyExpenseSum = aggregateDataByMonth(filteredExpenseData || []);

  // Calculating Total Income and Expense
  const totalIncome = calculateTotal(filteredIncomeData || []);
  const totalExpense = calculateTotal(filteredExpenseData || []);

  // Prepare Overall Income and Expense Data for Bar Chart
  const overallIncomeExpenseData = generateIncomeExpenseData(
    monthlyIncomeSum,
    monthlyExpenseSum
  );

  // Preparing Monthly Expense Data by Category
  const overallMonthlyExpenseData = generateMonthlyExpenseData({
    data: expenseDataByMonthCategory?.data ?? [],
  });

  // Preparing Data for Expense Category Pie Chart
  const overallExpenseCategoryPieChartData =
    generateExpenseCategoryPieChartData(categories, filteredExpenseData);

  return (
    <>
      {incomeLoading || expenseLoading || expenseMonthCategoryLoading ? (
        // Default values shown
        <HourGlassLoader />
      ) : (
        <>
          <div className="p-4  min-h-[90vh]">
            <div className="px-5 flex flex-row">
              <div>
                <h1 className="w-fit text-3xl font-bold mr-1 py-3">
                  Hello {userName}
                </h1>
              </div>
              <div className="flex flex-row ml-auto">
                <div className="flex flex-row">
                  <label className="block text-lg font-medium h-12 m-2 p-2">
                    From
                  </label>
                  <DatePickerInput
                    value={startDate}
                    onChange={(value) => setStartDate(value)}
                  />
                </div>
                <div className="flex flex-row">
                  <label className="block text-lg font-medium h-12 m-2 p-2">
                    To
                  </label>
                  <DatePickerInput
                    value={endDate}
                    onChange={(value) => setEndDate(value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row w-full gap-4 p-2">
              <div className="w-1/2 p-5 bg-primaryBackground rounded-xl">
                <p>Overall Balance</p>
                <SubHeaderText
                  label={
                    totalIncome
                      ? `$ ${(totalIncome - totalExpense).toString()}`
                      : `$ 0`
                  }
                />
              </div>
              <div className="w-1/2 p-5 bg-positiveBackground rounded-xl">
                <p>Total Income</p>
                <SubHeaderText label={`$ ${totalIncome}`} />
              </div>
              <div className="w-1/2 p-5 bg-negativeBackground rounded-xl">
                <p className="text-xl">Total Expense</p>
                <SubHeaderText label={`$ ${totalExpense}`} />
              </div>
            </div>
            <div className="p-2 w-full">
              <IncomeExpenseYearlyBarChart
                overallIncomeExpenseData={overallIncomeExpenseData}
              />
            </div>
            <div className="flex p-2 gap-4">
              <div className="w-1/2">
                <ExpenseCategoryYearlyBarChart
                  overallMonthlyExpenseData={overallMonthlyExpenseData}
                  categories={categories}
                />
              </div>
              <div className="w-1/2">
                <ExpenseCategoryPieChart
                  overallExpenseCategoryData={
                    overallExpenseCategoryPieChartData
                  }
                />
              </div>
            </div>
            <div className="p-2">
              <ExpenseTable
                expenseAllData={filteredExpenseData
                  ?.sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  ?.slice(0, 5)}
                headerRequired={true}
                headerLabel="Latest Transactions - Expense"
                colSpan={5}
              />
            </div>
            <div className="p-2">
              <IncomeTable
                incomeAllData={filteredIncomeData
                  ?.sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  ?.slice(0, 5)}
                headerRequired={true}
                headerLabel="Latest Transactions - Income"
                colSpan={4}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
