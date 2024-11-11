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

interface YearlyExpenseStatisticsChartProps {
  overallMonthlyExpenseData: {
    month: string;
    [key: string]: number | string;
  }[];
  categories: string[];
  colors: Record<string, string>;
}

export const ExpenseCategoryYearlyBarChart = ({
  overallMonthlyExpenseData,
  categories,
  colors,
}: YearlyExpenseStatisticsChartProps) => {
  return (
    <>
      <div className="border-2 rounded-lg w-1/2">
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
            {categories.map((key: string) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={colors[key]}
                barSize={45}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
