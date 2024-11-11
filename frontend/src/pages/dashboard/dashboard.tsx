import { Header2Text } from "../../components/text/Header2Text";
import { SubHeaderText } from "../../components/text/SubHeaderText";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
      month: "December - 2023",
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
      month: "January - 2024",
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
      month: "February - 2024",
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
      month: "March - 2024",
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
      month: "July - 2024",
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
        <div className="flex">
          <div className="border-2 rounded-lg m-2 w-1/2">
            <Header2Text
              label="Yearly Income and Expense"
              className="mx-5 my-3 text-center"
            />
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={overallIncomeExpenseData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />

                {/* Bar for Income */}
                <Bar
                  dataKey="income"
                  fill="#7bed9f"
                  name="Income"
                  barSize={20}
                />

                {/* Bar for Expense */}
                <Bar
                  dataKey="expense"
                  fill="#e74c3c"
                  name="Expense"
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="border-2 rounded-lg m-2 w-1/2">
            <Header2Text
              label="Yearly Expense Statistics"
              className="mx-5 my-3 text-center"
            />
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={overallMonthlyExpenseData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {categories.map((key) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    stackId="a"
                    fill={COLORS[key]}
                    barSize={50}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
