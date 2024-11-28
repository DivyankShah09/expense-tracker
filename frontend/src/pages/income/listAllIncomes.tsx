import { useState } from "react";
import SliderInput from "../../components/input/SliderInput";
import { IncomeTable } from "../../components/table/IncomeTable";
import { HeaderText } from "../../components/text/HeaderText";
import { useGetIncome } from "../../hooks/getIncomeHook";
import DatePickerInput from "../../components/input/DatePickerInput";
import { toast } from "react-toastify";
import { HourGlassLoader } from "../../components/loader/HourGlassLoader";

const ListAllIncomes = () => {
  const userId = localStorage.getItem("userId") || "0";
  const [amount, setAmount] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const { data: incomeData, isLoading: incomeLoading } = useGetIncome(
    userId,
    true
  );

  const start = startDate ? new Date(startDate).getTime() : null; // Start date as timestamp
  const end = endDate
    ? new Date(new Date(endDate).setHours(23, 59, 59, 999) + 1).getTime() // End date set to the end of the day
    : null;
  let filteredData;

  if (start && end && start > end) {
    toast.error("From date cannot be after To date.");
    filteredData = incomeData?.data; // Return empty array or handle as needed
  } else {
    // Filter and sort data
    filteredData = incomeData?.data
      ?.filter((income) => {
        const incomeDate = new Date(income.date).getTime(); // Use the original expense date timestamp

        return (
          (Number(amount) === 0 || income.amount <= amount) && // Filter by max amount
          (!start || incomeDate >= start) && // Filter by start date
          (!end || incomeDate <= end) // Filter by end date (inclusive)
        );
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } // Sort by date descending
  return (
    <>
      {incomeLoading ? (
        <HourGlassLoader />
      ) : (
        <div className="my-5 text-center">
          <HeaderText label="All Income" />
          <div className="px-5 flex flex-row gap-5">
            <div className="flex flex-row gap-2">
              <SliderInput
                label="Amount"
                value={amount}
                minValue={0}
                maxValue={1000}
                onChange={(value: number) => setAmount(value)}
              />
              <div className="flex flex-row">
                <label className="block text-lg font-medium h-12 m-2 p-2">
                  From
                </label>
                <DatePickerInput
                  value={startDate}
                  onChange={(value) => setStartDate(value)}
                />
              </div>
              <div className="flex flex-row">
                <label className="block text-lg font-medium h-12 m-2 p-2">
                  To
                </label>
                <DatePickerInput
                  value={endDate}
                  onChange={(value) => setEndDate(value)}
                />
              </div>
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
      )}
    </>
  );
};

export default ListAllIncomes;
