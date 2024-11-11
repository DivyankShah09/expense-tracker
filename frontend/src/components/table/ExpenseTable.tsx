import { Header2Text } from "../../components/text/Header2Text";

interface ExpenseTransaction {
  title: string;
  date: string;
  amount: number;
  description: string;
  category: string;
}

interface LatestExpenseTransactionsTableProps {
  expenseAllData: ExpenseTransaction[];
  headerRequired?: boolean;
  headerLabel?: string;
  colSpan?: number | undefined;
}
export const ExpenseTable = ({
  expenseAllData,
  headerRequired = false,
  headerLabel = "",
  colSpan = undefined,
}: LatestExpenseTransactionsTableProps) => {
  return (
    <>
      <table className="table-auto w-full border-separate rounded-lg border-2 overflow-hidden">
        <thead>
          {headerRequired && (
            <tr>
              <th colSpan={colSpan}>
                <Header2Text label={headerLabel} className="m-2 text-left" />
              </th>

              <td className="text-right">
                <p className="m-2">
                  <u className="font-semibold hover:text-primary cursor-pointer">
                    View All
                  </u>
                </p>
              </td>
            </tr>
          )}
          <tr className="bg-gray-200">
            <th className="p-2">Sr. No</th>
            <th className="p-2">Title</th>
            <th className="p-2">Date</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Category</th>
            <th className="p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {expenseAllData.map((expense: ExpenseTransaction, index: number) => (
            <tr key={index} className="bg-white rounded-md shadow-md">
              <td className="text-center p-2">{index + 1}</td>
              <td className="p-2">{expense.title}</td>
              <td className="text-center p-2">{expense.date}</td>
              <td className="text-center p-2">${expense.amount}</td>
              <td className="text-center p-2">{expense.category}</td>
              <td className="p-2">{expense.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
