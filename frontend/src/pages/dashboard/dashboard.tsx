import { ExpenseCategoryYearlyBarChart } from "../../components/chart/ExpenseCategoryYearlyBarChart";
import { IncomeExpenseYearlyBarChart } from "../../components/chart/IncomeExpenseYearlyBarChart";
import { ExpenseTable } from "../../components/table/ExpenseTable";
import { IncomeTable } from "../../components/table/IncomeTable";
import { SubHeaderText } from "../../components/text/SubHeaderText";
// import { useGetIncome } from "./hook/getIncomeHook";
import { MonthEnum } from "../../enums/monthEnum";
import { ExpenseCategoryEnum } from "../../enums/expenseCategoryEnum";
import {
  useGetExpenseByMonthCategory,
  useGetExpenseByYear,
} from "../../hooks/getExpenseHook";
import { useGetIncome, useGetIncomeByYear } from "../../hooks/getIncomeHook";

const dateFormat = (date: Date): string => {
  const d = new Date(date); // Ensure it's a Date object
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();

  return `${month}-${day}-${year}`;
};

const Dashboard = () => {
  const userId = localStorage.getItem("userId") || "0";

  // Get Income api
  const { data: incomeData, isLoading: incomeLoading } = useGetIncomeByYear(
    userId,
    "2023", // TODO: change the year to current year
    true
  );

  // Get Expense api
  const { data: expenseData, isLoading: expenseLoading } = useGetExpenseByYear(
    userId,
    "2023", // TODO: change the year to current year
    true
  );

  // Get Expense by month and category api
  const {
    data: expenseDataByMonthCategory,
    isLoading: expenseMonthCategoryLoading,
  } = useGetExpenseByMonthCategory(userId, "2023", true); // TODO: change 2023 to current year

  const monthlyIncomeSum = new Array(12).fill(0);
  const monthlyExpenseSum = new Array(12).fill(0);

  incomeData?.data.forEach((entry) => {
    const date = new Date(entry.date);
    const month = date.getMonth(); // 0-11 for Jan-Dec
    monthlyIncomeSum[month] += entry.amount;
  });

  expenseData?.data.forEach((entry) => {
    const date = new Date(entry.date);
    const month = date.getMonth(); // 0-11 for Jan-Dec
    monthlyExpenseSum[month] += entry.amount;
  });

  console.log(incomeLoading, expenseLoading, expenseMonthCategoryLoading);

  const totalExpense = expenseData?.data.reduce((total, entry) => {
    return total + entry.amount; // Assuming `entry.amount` contains the expense amount
  }, 0);

  const totalIncome = incomeData?.data.reduce((total, entry) => {
    return total + entry.amount; // Assuming `entry.amount` contains the expense amount
  }, 0);

  const months = Object.keys(MonthEnum).filter((key) => isNaN(Number(key)));

  const overallIncomeExpenseData = months.map((month, index) => ({
    month,
    income: monthlyIncomeSum[index],
    expense: monthlyExpenseSum[index],
  }));

  const overallMonthlyExpenseData: any = [];

  let startMonth = 1;
  let monthlyData: { month: string; [key: string]: any } = {
    month: MonthEnum[startMonth - 1],
  };

  expenseDataByMonthCategory?.data?.map((expense) => {
    if (expense.month === startMonth) {
      monthlyData[
        expense.categoryName
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      ] = expense.amount;
    } else {
      overallMonthlyExpenseData.push(monthlyData);
      startMonth += 1;
      monthlyData = { month: MonthEnum[startMonth - 1] };
      monthlyData[
        expense.categoryName
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      ] = expense.amount;
    }
  });

  // Function to generate random hex color
  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const categories = Object.values(ExpenseCategoryEnum).map((category) =>
    category.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );

  const COLORS: Record<string, string> = {};
  categories.forEach((category) => {
    COLORS[category] = getRandomColor();
  });

  return (
    <>
      <div className="p-4">
        <div className="flex flex-row w-full gap-4 p-2">
          <div className="w-1/2 p-5 bg-primaryBackground rounded-xl">
            <p>Overall Balance</p>
            <SubHeaderText
              label={
                totalIncome && totalExpense
                  ? `$ ${(totalIncome - totalExpense).toString()}`
                  : "$ 0"
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
        <div className="flex p-2 gap-4">
          <IncomeExpenseYearlyBarChart
            overallIncomeExpenseData={overallIncomeExpenseData}
          />

          {overallMonthlyExpenseData.length > 0 ? (
            <ExpenseCategoryYearlyBarChart
              overallMonthlyExpenseData={overallMonthlyExpenseData}
              categories={categories}
              colors={COLORS}
            />
          ) : (
            <div>{overallMonthlyExpenseData.length}</div>
          )}
        </div>
        <div className="p-2">
          <ExpenseTable
            expenseAllData={expenseData?.data
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
            incomeAllData={incomeData?.data
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
  );
};

export default Dashboard;
