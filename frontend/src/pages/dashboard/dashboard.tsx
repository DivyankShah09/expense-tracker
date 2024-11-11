import { ExpenseCategoryYearlyBarChart } from "../../components/chart/ExpenseCategoryYearlyBarChart";
import { IncomeExpenseYearlyBarChart } from "../../components/chart/IncomeExpenseYearlyBarChart";
import { ExpenseTable } from "../../components/table/ExpenseTable";
import { IncomeTable } from "../../components/table/IncomeTable";
import { Header2Text } from "../../components/text/Header2Text";
import { SubHeaderText } from "../../components/text/SubHeaderText";

const Dashboard = () => {
  // dummy data - for overall income and expense
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
  const income = [
    4000, 3000, 5000, 4780, 3890, 4390, 5490, 6000, 7000, 6700, 5400, 6100,
  ];
  const expense = [
    2400, 1398, 4300, 2900, 2100, 2500, 3300, 4200, 4700, 3900, 2800, 3200,
  ];

  const overallIncomeExpenseData = months.map((month, index) => ({
    month,
    income: income[index],
    expense: expense[index],
  }));

  // monthly expense chart
  const overallMonthlyExpenseData = [
    {
      month: "December",
      Bills: 301.81,
      Food: 43.98,
      Grocery: 184.43,
      "Grocery - Personal": 46.16,
      "Clothing, Shoes & Jewelry": 0,
      Electronics: 0,
      "Home Appliances": 0,
      Entertainment: 31.79,
    },
    {
      month: "January",
      Bills: 290.98,
      Food: 63.11,
      Grocery: 43.4,
      "Grocery - Personal": 26.15,
      "Clothing, Shoes & Jewelry": 0,
      Electronics: 0,
      "Home Appliances": 0,
      Entertainment: 0,
    },
    {
      month: "February",
      Bills: 541.46,
      Food: 105.69,
      Grocery: 49.57,
      "Grocery - Personal": 35.93,
      "Clothing, Shoes & Jewelry": 0,
      Electronics: 0,
      "Home Appliances": 0,
      Entertainment: 308.22,
    },
    {
      month: "March",
      Bills: 349.1,
      Food: 70.17,
      Grocery: 110.65,
      "Grocery - Personal": 22.63,
      "Clothing, Shoes & Jewelry": 0,
      Electronics: 0,
      "Home Appliances": 0,
      Entertainment: 37.04,
    },
    {
      month: "July",
      Bills: 764.18,
      Food: 73.1,
      Grocery: 52.21,
      "Grocery - Personal": 34.5,
      "Clothing, Shoes & Jewelry": 2.26,
      Electronics: 0,
      "Home Appliances": 0,
      Entertainment: 0,
    },
  ];

  // Expense dumy data
  const expenseAllData = [
    {
      id: 1,
      title: "Milk",
      description: "Monday milk",
      amount: 7,
      date: "2024-11-11",
      category: "Groceries",
    },
    {
      id: 2,
      title: "Netflix Subscription",
      description: "Monthly subscription fee",
      amount: 15,
      date: "2024-11-05",
      category: "Entertainment",
    },
    {
      id: 3,
      title: "Electricity Bill",
      description: "Monthly electricity bill payment",
      amount: 120,
      date: "2024-11-01",
      category: "Utilities",
    },
    {
      id: 4,
      title: "Gym Membership",
      description: "Monthly gym subscription",
      amount: 50,
      date: "2024-11-03",
      category: "Health & Fitness",
    },
    {
      id: 5,
      title: "Coffee",
      description: "Coffee at the café",
      amount: 5,
      date: "2024-11-10",
      category: "Dining Out",
    },
  ];

  const incomeAllData = [
    {
      id: 1,
      title: "Salary",
      description: "Nov week 2",
      amount: 500,
      date: "2024-11-11",
    },
    {
      id: 2,
      title: "Interest",
      description: "Nov interest",
      amount: 15,
      date: "2024-11-05",
    },
    {
      id: 3,
      title: "Cashback",
      description: "Tshirt return cashback",
      amount: 120,
      date: "2024-11-01",
    },
    {
      id: 4,
      title: "Rent",
      description: "Nov rent",
      amount: 1150,
      date: "2024-11-03",
    },
    {
      id: 5,
      title: "Reward",
      description: "Lottery",
      amount: 455,
      date: "2024-11-10",
    },
  ];

  // Function to generate random hex color
  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  // Generate random colors for each category
  const categories = [
    "Bills",
    "Food",
    "Grocery",
    "Grocery - Personal",
    "Clothing, Shoes & Jewelry",
    "Electronics",
    "Home Appliances",
    "Entertainment",
  ];

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
          <ExpenseCategoryYearlyBarChart
            overallMonthlyExpenseData={overallMonthlyExpenseData}
            categories={categories}
            colors={COLORS}
          />
        </div>
        <div className="p-2">
          <ExpenseTable
            expenseAllData={expenseAllData}
            headerRequired={true}
            headerLabel="Latest Transactions - Expense"
            colSpan={5}
          />
        </div>
        <div className="p-2">
          <IncomeTable
            incomeAllData={incomeAllData}
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
