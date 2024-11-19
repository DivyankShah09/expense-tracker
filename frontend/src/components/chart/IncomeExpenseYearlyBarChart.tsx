import { Header2Text } from "../../components/text/Header2Text";
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
import { MonthEnum } from "../../enums/monthEnum";

interface DataPoint {
  month: string | MonthEnum;
  income: number;
  expense: number;
}

interface YearlyIncomeExpenseChartProps {
  overallIncomeExpenseData: DataPoint[];
}

export const IncomeExpenseYearlyBarChart = ({
  overallIncomeExpenseData,
}: YearlyIncomeExpenseChartProps) => {
  return (
    <>
      <div className="border-2 rounded-lg w-1/2">
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

            <Bar dataKey="income" fill="#7bed9f" name="Income" barSize={10} />

            <Bar dataKey="expense" fill="#e74c3c" name="Expense" barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
