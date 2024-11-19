import { ExpenseCategoryYearlyBarChart } from "../../components/chart/ExpenseCategoryYearlyBarChart";
import { IncomeExpenseYearlyBarChart } from "../../components/chart/IncomeExpenseYearlyBarChart";
import { ExpenseTable } from "../../components/table/ExpenseTable";
import { IncomeTable } from "../../components/table/IncomeTable";
import { SubHeaderText } from "../../components/text/SubHeaderText";
import { useGetIncome } from "./hook/getIncomeHook";
import { useGetExpense } from "./hook/getExpenseHook";
import { useGetExpenseByMonthCategory } from "./hook/getExpenseByCategoryMonthHook";
import { MonthEnum } from "../../enums/monthEnum";
import { ExpenseCategoryEnum } from "../../enums/expenseCategoryEnum";

const Dashboard = () => {
  const userId = localStorage.getItem("userId") || "0";

  // Get Income api
  const { data: incomeData, isLoading: incomeLoading } = useGetIncome(
    userId,
    true
  );

  // Get Expense api
  const { data: expenseData, isLoading: expenseLoading } = useGetExpense(
    userId,
    true
  );

  const {
    data: expenseDataByMonthCategory,
    isLoading: expenseMonthCategoryLoading,
  } = useGetExpenseByMonthCategory(userId, true);

  console.log("expense data - Month: ", expenseDataByMonthCategory);

  const monthlyIncomeSum = new Array(12).fill(0);
  const monthlyExpenseSum = new Array(12).fill(0);

  // Process the income data
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

  const dateFormat = (date: Date): string => {
    const d = new Date(date); // Ensure it's a Date object
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();

    return `${month}-${day}-${year}`;
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const overallIncomeExpenseData = months.map((month, index) => ({
    month,
    income: monthlyIncomeSum[index],
    expense: monthlyExpenseSum[index],
  }));

  const formattedExpenseData = expenseData?.data?.map((item) => ({
    ...item,
    date: dateFormat(new Date(item.date)), // Apply dateFormat to the date field
  }));

  const formattedIncomeData = incomeData?.data?.map((item) => ({
    ...item,
    date: dateFormat(new Date(item.date)), // Apply dateFormat to the date field
  }));

  // const abc = formattedExpenseData?.map((expense) => {

  //   Object.values(ExpenseCategoryEnum).forEach((category) => {
  //     console.log(category); // Logs each category in the enum for each expense
  //   });

  //   return expense;
  // });

  // const abc = Object.values(MonthEnum).forEach((category) => {

  // })
  // const overallMonthlyExpenseData = [
  //   {
  //     month: "December",
  //     Bills: 301.81,
  //     Food: 43.98,
  //     Grocery: 184.43,
  //     "Grocery - Personal": 46.16,
  //     "Clothing, Shoes & Jewelry": 0,
  //     Electronics: 0,
  //     "Home Appliances": 0,
  //     Entertainment: 31.79,
  //   },
  //   {
  //     month: "January",
  //     Bills: 290.98,
  //     Food: 63.11,
  //     Grocery: 43.4,
  //     "Grocery - Personal": 26.15,
  //     "Clothing, Shoes & Jewelry": 0,
  //     Electronics: 0,
  //     "Home Appliances": 0,
  //     Entertainment: 0,
  //   },
  //   {
  //     month: "February",
  //     Bills: 541.46,
  //     Food: 105.69,
  //     Grocery: 49.57,
  //     "Grocery - Personal": 35.93,
  //     "Clothing, Shoes & Jewelry": 0,
  //     Electronics: 0,
  //     "Home Appliances": 0,
  //     Entertainment: 308.22,
  //   },
  //   {
  //     month: "March",
  //     Bills: 349.1,
  //     Food: 70.17,
  //     Grocery: 110.65,
  //     "Grocery - Personal": 22.63,
  //     "Clothing, Shoes & Jewelry": 0,
  //     Electronics: 0,
  //     "Home Appliances": 0,
  //     Entertainment: 37.04,
  //   },
  //   {
  //     month: "July",
  //     Bills: 764.18,
  //     Food: 73.1,
  //     Grocery: 52.21,
  //     "Grocery - Personal": 34.5,
  //     "Clothing, Shoes & Jewelry": 2.26,
  //     Electronics: 0,
  //     "Home Appliances": 0,
  //     Entertainment: 0,
  //   },
  // ];

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
      console.log("monthly data in if: ", monthlyData);
    } else {
      overallMonthlyExpenseData.push(monthlyData);
      startMonth += 1;
      monthlyData = { month: MonthEnum[startMonth - 1] };
      monthlyData[
        expense.categoryName
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      ] = expense.amount;
      console.log("monthly data in else: ", monthlyData);
    }
  });

  // monthly expense chart
  console.log("====================================");
  console.log(JSON.stringify(overallMonthlyExpenseData));
  console.log("====================================");

  // Function to generate random hex color
  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  // Generate random colors for each category
  // const categories = [
  //   "Bills",
  //   "Food",
  //   "Grocery",
  //   "Grocery - Personal",
  //   "Clothing, Shoes & Jewelry",
  //   "Electronics",
  //   "Home Appliances",
  //   "Entertainment",
  // ];
  const categories = Object.values(ExpenseCategoryEnum).map((category) =>
    category.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );

  console.log("categories: ", categories);

  const COLORS: Record<string, string> = {};
  categories.forEach((category) => {
    COLORS[category] = getRandomColor();
  });

  return (
    <>
      <div className="p-4">
        <div className="flex flex-row w-full gap-4 p-2">
          <div className="w-1/2 p-5 bg-primaryBackground rounded-xl">
            <p>Current Balance</p>
            <SubHeaderText label="$ 15000" />
            <p className="text-sm text-primary">Compared to last month: </p>
          </div>
          <div className="w-1/2 p-5 bg-positiveBackground rounded-xl">
            <p>Total Income</p>
            <SubHeaderText label="$ 20000" />
            <p className="text-sm text-positiveText">Compared to last month:</p>
          </div>
          <div className="w-1/2 p-5 bg-negativeBackground rounded-xl">
            <p className="text-xl">Total Expense</p>
            <SubHeaderText label="$ 5000" />
            <p className="text-sm text-negativeText">
              Compared to last month:{" "}
            </p>
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
            expenseAllData={formattedExpenseData
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
            incomeAllData={formattedIncomeData
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
