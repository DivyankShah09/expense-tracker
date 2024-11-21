import { Header2Text } from "../../components/text/Header2Text";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartColors } from "../../enums/chartColors";

interface YearlyExpenseStatisticsChartProps {
  overallMonthlyExpenseData: {
    month: string;
    [key: string]: number | string;
  }[];
  categories: string[];
}

export const ExpenseCategoryYearlyBarChart = ({
  overallMonthlyExpenseData,
  categories,
}: YearlyExpenseStatisticsChartProps) => {
  const chartColorsArray = Object.values(ChartColors);
  return (
    <>
      <div className="border-2 rounded-lg w-full">
        <Header2Text
          label="Yearly Expense Statistics"
          className="mx-5 my-3 text-center"
        />
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={overallMonthlyExpenseData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {categories.map((key: string, index: number) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={chartColorsArray[index % chartColorsArray.length]}
                barSize={45}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
