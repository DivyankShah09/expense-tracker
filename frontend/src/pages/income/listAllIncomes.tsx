import { useState } from "react";
import SliderInput from "../../components/input/SliderInput";
import { IncomeTable } from "../../components/table/IncomeTable";
import { HeaderText } from "../../components/text/HeaderText";
import { useGetIncome } from "../../hooks/getIncomeHook";

const ListAllIncomes = () => {
  const userId = localStorage.getItem("userId") || "0";
  const [amount, setAmount] = useState<number>(0);
  const { data: incomeData, isLoading: incomeLoading } = useGetIncome(
    userId,
    true
  );

  const filteredData = incomeData?.data
    ?.filter((expense) => {
      return (
        Number(amount) === 0 || expense.amount <= amount // Filter by max amount
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending
  return (
    <>
      <div className="my-5 text-center">
        <HeaderText label="All Income" />
        <div className="px-5 flex flex-row gap-5">
          <div className="py-2">
            <h1 className="text-primary font-semibold text-lg text-left w-fit">
              Filters :
            </h1>
            <SliderInput
              label="Amount"
              value={amount}
              minValue={250}
              maxValue={1000}
              onChange={(value: number) => setAmount(value)}
            />
          </div>
        </div>
        <div className="px-5 py-1">
          <IncomeTable
            incomeAllData={filteredData}
            headerRequired={false}
            colSpan={5}
          />
        </div>
      </div>
    </>
  );
};

export default ListAllIncomes;
