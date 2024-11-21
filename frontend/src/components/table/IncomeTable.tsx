import React from "react";
import { Header2Text } from "../../components/text/Header2Text";
import { useNavigate } from "react-router-dom";

interface IncomeTransaction {
  title: string;
  date: string;
  amount: number;
  description: string;
}

interface LatestIncomeTransactionsTableProps {
  incomeAllData: IncomeTransaction[] | undefined;
  headerRequired?: boolean;
  headerLabel?: string;
  colSpan?: number | undefined;
}

export const IncomeTable = ({
  incomeAllData,
  headerRequired = false,
  headerLabel = "",
  colSpan = undefined,
}: LatestIncomeTransactionsTableProps) => {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate("/list-all-incomes");
  };
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
                <p className="m-2" onClick={handleViewAllClick}>
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
            <th className="p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {incomeAllData?.map((income: IncomeTransaction, index: number) => (
            <tr key={index} className="bg-white rounded-md shadow-md">
              <td className="text-center p-2">{index + 1}</td>
              <td className="p-2">{income.title}</td>
              <td className="text-center p-2">{income.date}</td>
              <td className="text-center p-2">${income.amount}</td>
              <td className="p-2">{income.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
