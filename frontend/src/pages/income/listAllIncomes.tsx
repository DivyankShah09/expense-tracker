import { useEffect, useState } from "react";
import SliderInput from "../../components/input/SliderInput";
import { IncomeTable } from "../../components/table/IncomeTable";
import { HeaderText } from "../../components/text/HeaderText";
import DatePickerInput from "../../components/input/DatePickerInput";
import { toast } from "react-toastify";
import { HourGlassLoader } from "../../components/loader/HourGlassLoader";
import { useGetIncomeByUserId } from "../../hooks/income/getIncomeHook";
import { Income } from "../../interfaces/Income";
import { useDeleteIncome } from "../../hooks/income/deleteIncomeHook";

const ListAllIncomes = () => {
  const userId = localStorage.getItem("userId") || "0";
  const [amount, setAmount] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filteredIncomeData, setFilteredIncomeData] = useState<Income[]>([]);
  const { mutateAsync: deleteIncomeMutateAsync } = useDeleteIncome();

  const { data: incomeData, isLoading: incomeLoading } = useGetIncomeByUserId(
    userId,
    true
  );

  const start = startDate ? new Date(startDate).getTime() : null; // Start date as timestamp
  const end = endDate
    ? new Date(new Date(endDate).setHours(23, 59, 59, 999) + 1).getTime() // End date set to the end of the day
    : null;

  useEffect(() => {
    let filteredData: any;

    if (start && end && start > end) {
      toast.error("From date cannot be after To date.");
      filteredData = incomeData?.data; // Return empty array or handle as needed
      setFilteredIncomeData(filteredData);
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
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      setFilteredIncomeData(filteredData);
    }
  }, [incomeData, amount, startDate, endDate, start, end]);

  const handleDelete = async (id: number | undefined) => {
    console.log("id: ", id);

    if (!id) return;

    try {
      await deleteIncomeMutateAsync(id.toString());
      toast.success("Expense deleted successfully!");
      setFilteredIncomeData((prevData) => {
        return prevData.filter((income: Income) => income.id !== id);
      });
    } catch (error) {
      toast.error("Error occured");
    }
  };

  return (
    <>
      {incomeLoading ? (
        <HourGlassLoader />
      ) : (
        <div className="py-5 text-center w-full min-h-[90vh]">
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
              incomeAllData={filteredIncomeData}
              headerRequired={false}
              updateBtnRequired={true}
              colSpan={5}
              onClick={handleDelete}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ListAllIncomes;
