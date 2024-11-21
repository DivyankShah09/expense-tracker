import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Header2Text } from "../text/Header2Text";
import { ChartColors } from "../../enums/chartColors";

interface ExpenseCategoryPieChartProps {
  overallExpenseCategoryData: { name: string; value: number }[];
}

const ExpenseCategoryPieChart = ({
  overallExpenseCategoryData,
}: ExpenseCategoryPieChartProps) => {
  const chartColorsArray = Object.values(ChartColors);
  return (
    <>
      <div className="border-2 rounded-lg w-full">
        <Header2Text
          label="Overall Expense-Category Distribution"
          className="mx-5 my-3 text-center"
        />
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={overallExpenseCategoryData}
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {overallExpenseCategoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColorsArray[index % chartColorsArray.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ExpenseCategoryPieChart;
