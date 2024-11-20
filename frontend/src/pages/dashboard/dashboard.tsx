import { ExpenseCategoryYearlyBarChart } from "../../components/chart/ExpenseCategoryYearlyBarChart";
import { IncomeExpenseYearlyBarChart } from "../../components/chart/IncomeExpenseYearlyBarChart";
import { ExpenseTable } from "../../components/table/ExpenseTable";
import { IncomeTable } from "../../components/table/IncomeTable";
import { SubHeaderText } from "../../components/text/SubHeaderText";
import { MonthEnum } from "../../enums/monthEnum";
import { ExpenseCategoryEnum } from "../../enums/expenseCategoryEnum";
import {
  useGetExpenseByMonthCategory,
  useGetExpenseByYear,
} from "../../hooks/getExpenseHook";
import { useGetIncomeByYear } from "../../hooks/getIncomeHook";
import DatePickerInput from "../../components/input/DatePickerInput";
import { useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const userId = localStorage.getItem("userId") || "0";
  const userName = localStorage.getItem("name") || " ";
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const start = startDate ? new Date(startDate).getTime() : null; // Start date as timestamp
  const end = endDate
    ? new Date(new Date(endDate).setHours(23, 59, 59, 999) + 1).getTime() // End date set to the end of the day
    : null;

  // Get Income api
  const { data: incomeData, isLoading: incomeLoading } = useGetIncomeByYear(
    userId,
    new Date().getFullYear().toString(),
    true
  );

  // Get Expense api
  const { data: expenseData, isLoading: expenseLoading } = useGetExpenseByYear(
    userId,
    new Date().getFullYear().toString(),
    true
  );

  // Get Expense by month and category api
  const {
    data: expenseDataByMonthCategory,
    isLoading: expenseMonthCategoryLoading,
  } = useGetExpenseByMonthCategory(
    userId,
    new Date().getFullYear().toString(),
    true,
    startDate,
    endDate
  );

  let filteredIncomeData;
  let filteredExpenseData;

  // Filtering the data based on the date
  filteredIncomeData = incomeData?.data;
  filteredExpenseData = expenseData?.data;

  if (start && end && start > end) {
    toast.error("From date cannot be after To date.");
  } else {
    filteredIncomeData = incomeData?.data?.filter((income) => {
      const incomeDate = new Date(income.date).getTime(); // Use the original expense date timestamp

      return (
        (!start || incomeDate >= start) && // Filter by start date
        (!end || incomeDate <= end) // Filter by end date (inclusive)
      );
    });
    filteredExpenseData = expenseData?.data?.filter((income) => {
      const expenseDate = new Date(income.date).getTime(); // Use the original expense date timestamp

      return (
        (!start || expenseDate >= start) && // Filter by start date
        (!end || expenseDate <= end) // Filter by end date (inclusive)
      );
    });
  }

  const monthlyIncomeSum = new Array(12).fill(0);
  const monthlyExpenseSum = new Array(12).fill(0);

  filteredIncomeData?.forEach((entry) => {
    const date = new Date(entry.date);
    const month = date.getMonth(); // 0-11 for Jan-Dec
    monthlyIncomeSum[month] += entry.amount;
  });

  filteredExpenseData?.forEach((entry) => {
    const date = new Date(entry.date);
    const month = date.getMonth(); // 0-11 for Jan-Dec
    monthlyExpenseSum[month] += entry.amount;
  });

  console.log(incomeLoading, expenseLoading, expenseMonthCategoryLoading);

  const totalExpense = filteredExpenseData?.reduce((total, entry) => {
    return total + entry.amount; // Assuming `entry.amount` contains the expense amount
  }, 0);

  const totalIncome = filteredIncomeData?.reduce((total, entry) => {
    return total + entry.amount; // Assuming `entry.amount` contains the expense amount
  }, 0);

  const months = Object.keys(MonthEnum).filter((key) => isNaN(Number(key)));

  const overallIncomeExpenseData = months
    .map((month, index) => ({
      month,
      income: monthlyIncomeSum[index],
      expense: monthlyExpenseSum[index],
    }))
    .filter((data) => data.income > 0 || data.expense > 0);

  const overallMonthlyExpenseData: any = [];

  // Loop through all 12 months
  for (let month = 1; month <= 12; month++) {
    let monthlyData: { month: string; [key: string]: any } = {
      month: MonthEnum[month - 1], // Initialize the first month
    };

    // Filter the expenses for this specific month
    const expensesForMonth = expenseDataByMonthCategory?.data.filter(
      (expense) => expense.month === month
    );

    // Process the expenses if they exist for this month
    if (expensesForMonth && expensesForMonth.length > 0) {
      expensesForMonth.forEach((expense) => {
        const formattedCategory = expense.categoryName
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

        monthlyData[formattedCategory] = expense.amount;
      });
    }

    // Push the data for the current month if there are any expenses for that month
    if (Object.keys(monthlyData).length > 1) {
      overallMonthlyExpenseData.push(monthlyData);
    }
  }

  // Function to generate random hex color
  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const categories = Object.values(ExpenseCategoryEnum).map((category) =>
    category.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );

  const COLORS: Record<string, string> = {};
  categories.forEach((category) => {
    COLORS[category] = getRandomColor();
  });

  return (
    <>
      <div className="p-4">
        <div className="px-5 flex flex-row">
          <div>
            <h1 className="w-fit text-3xl font-bold mr-1 py-3">
              Hello {userName}
            </h1>
          </div>
          <div className="flex flex-row ml-auto">
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

        <div className="flex flex-row w-full gap-4 p-2">
          <div className="w-1/2 p-5 bg-primaryBackground rounded-xl">
            <p>Overall Balance</p>
            <SubHeaderText
              label={
                totalIncome && totalExpense
                  ? `$ ${(totalIncome - totalExpense).toString()}`
                  : `$ ${(totalIncome - totalExpense).toString()}`
              }
            />
          </div>
          <div className="w-1/2 p-5 bg-positiveBackground rounded-xl">
            <p>Total Income</p>
            <SubHeaderText label={`$ ${totalIncome}`} />
          </div>
          <div className="w-1/2 p-5 bg-negativeBackground rounded-xl">
            <p className="text-xl">Total Expense</p>
            <SubHeaderText label={`$ ${totalExpense}`} />
          </div>
        </div>
        <div className="flex p-2 gap-4">
          <IncomeExpenseYearlyBarChart
            overallIncomeExpenseData={overallIncomeExpenseData}
          />

          {overallMonthlyExpenseData.length > 0 ? (
            <ExpenseCategoryYearlyBarChart
              overallMonthlyExpenseData={overallMonthlyExpenseData}
              categories={categories}
              colors={COLORS}
            />
          ) : (
            <div>{overallMonthlyExpenseData.length}</div>
          )}
        </div>
        <div className="p-2">
          <ExpenseTable
            expenseAllData={filteredExpenseData
              ?.sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              ?.slice(0, 5)}
            headerRequired={true}
            headerLabel="Latest Transactions - Expense"
            colSpan={5}
          />
        </div>
        <div className="p-2">
          <IncomeTable
            incomeAllData={filteredIncomeData
              ?.sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              ?.slice(0, 5)}
            headerRequired={true}
            headerLabel="Latest Transactions - Income"
            colSpan={4}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

// import { ExpenseCategoryYearlyBarChart } from "../../components/chart/ExpenseCategoryYearlyBarChart";
// import { IncomeExpenseYearlyBarChart } from "../../components/chart/IncomeExpenseYearlyBarChart";
// import { ExpenseTable } from "../../components/table/ExpenseTable";
// import { IncomeTable } from "../../components/table/IncomeTable";
// import { SubHeaderText } from "../../components/text/SubHeaderText";
// import { MonthEnum } from "../../enums/monthEnum";
// import { ExpenseCategoryEnum } from "../../enums/expenseCategoryEnum";
// import {
//   useGetExpenseByMonthCategory,
//   useGetExpenseByYear,
// } from "../../hooks/getExpenseHook";
// import { useGetIncomeByYear } from "../../hooks/getIncomeHook";
// import DatePickerInput from "../../components/input/DatePickerInput";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const Dashboard = () => {
//   const userId = localStorage.getItem("userId") || "0";
//   const userName = localStorage.getItem("name") || " ";
//   const [startDate, setStartDate] = useState<string>("");
//   const [endDate, setEndDate] = useState<string>("");
//   const start = startDate ? new Date(startDate).getTime() : null; // Start date as timestamp
//   const end = endDate
//     ? new Date(new Date(endDate).setHours(23, 59, 59, 999) + 1).getTime() // End date set to the end of the day
//     : null;

//   // Get Income API
//   const { data: incomeData, isLoading: incomeLoading } = useGetIncomeByYear(
//     userId,
//     new Date().getFullYear().toString(),
//     true
//   );

//   // Get Expense API
//   const { data: expenseData, isLoading: expenseLoading } = useGetExpenseByYear(
//     userId,
//     new Date().getFullYear().toString(),
//     true
//   );

//   // Get Expense by month and category API
//   const {
//     data: expenseDataByMonthCategory,
//     isLoading: expenseMonthCategoryLoading,
//   } = useGetExpenseByMonthCategory(
//     userId,
//     new Date().getFullYear().toString(),
//     true,
//     startDate,
//     endDate
//   );

//   console.log("====================================");
//   console.log(expenseDataByMonthCategory);
//   console.log("====================================");

//   // Filtered income and expense data
//   const [filteredIncomeData, setFilteredIncomeData] = useState<
//     any[] | undefined
//   >([]);
//   const [filteredExpenseData, setFilteredExpenseData] = useState<
//     any[] | undefined
//   >([]);

//   // Filtering the data based on the date
//   useEffect(() => {
//     if (start && end && start > end) {
//       toast.error("From date cannot be after To date.");
//       return;
//     }

//     const filteredIncome = incomeData?.data?.filter((income) => {
//       const incomeDate = new Date(income.date).getTime();
//       return (!start || incomeDate >= start) && (!end || incomeDate <= end);
//     });

//     const filteredExpense = expenseData?.data?.filter((expense) => {
//       const expenseDate = new Date(expense.date).getTime();
//       return (!start || expenseDate >= start) && (!end || expenseDate <= end);
//     });

//     setFilteredIncomeData(filteredIncome);
//     setFilteredExpenseData(filteredExpense);
//   }, [startDate, endDate, incomeData, expenseData]);

//   const monthlyIncomeSum = new Array(12).fill(0);
//   const monthlyExpenseSum = new Array(12).fill(0);

//   filteredIncomeData?.forEach((entry) => {
//     const date = new Date(entry.date);
//     const month = date.getMonth(); // 0-11 for Jan-Dec
//     monthlyIncomeSum[month] += entry.amount;
//   });

//   filteredExpenseData?.forEach((entry) => {
//     const date = new Date(entry.date);
//     const month = date.getMonth(); // 0-11 for Jan-Dec
//     monthlyExpenseSum[month] += entry.amount;
//   });

//   console.log(incomeLoading, expenseLoading, expenseMonthCategoryLoading);

//   const totalExpense = filteredExpenseData?.reduce((total, entry) => {
//     return total + entry.amount; // Assuming `entry.amount` contains the expense amount
//   }, 0);

//   const totalIncome = filteredIncomeData?.reduce((total, entry) => {
//     return total + entry.amount; // Assuming `entry.amount` contains the income amount
//   }, 0);

//   const months = Object.keys(MonthEnum).filter((key) => isNaN(Number(key)));

//   const overallIncomeExpenseData = months.map((month, index) => ({
//     month,
//     income: monthlyIncomeSum[index],
//     expense: monthlyExpenseSum[index],
//   }));

//   const overallMonthlyExpenseData: any = [];

//   // Loop through all 12 months
//   for (let month = 1; month <= 12; month++) {
//     let monthlyData: { month: string; [key: string]: any } = {
//       month: MonthEnum[month - 1], // Initialize the first month
//     };

//     // Filter the expenses for this specific month
//     const expensesForMonth = expenseDataByMonthCategory?.data.filter(
//       (expense) => expense.month === month
//     );

//     // Process the expenses if they exist for this month
//     if (expensesForMonth && expensesForMonth.length > 0) {
//       expensesForMonth.forEach((expense) => {
//         const formattedCategory = expense.categoryName
//           .replace(/_/g, " ")
//           .replace(/\b\w/g, (char) => char.toUpperCase());

//         monthlyData[formattedCategory] = expense.amount;
//       });
//     }

//     // Push the data for the current month if there are any expenses for that month
//     if (Object.keys(monthlyData).length > 1) {
//       overallMonthlyExpenseData.push(monthlyData);
//     }
//   }

//   // Function to generate random hex color
//   const getRandomColor = () => {
//     return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//   };

//   const categories = Object.values(ExpenseCategoryEnum).map((category) =>
//     category.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
//   );

//   const COLORS: Record<string, string> = {};
//   categories.forEach((category) => {
//     COLORS[category] = getRandomColor();
//   });

//   return (
//     <>
//       <div className="p-4">
//         <div className="px-5 flex flex-row">
//           <div>
//             <h1 className="w-fit text-3xl font-bold mr-1 py-3">
//               Hello {userName}
//             </h1>
//           </div>
//           <div className="flex flex-row ml-auto">
//             <div className="flex flex-row">
//               <label className="block text-lg font-medium h-12 m-2 p-2">
//                 From
//               </label>
//               <DatePickerInput
//                 value={startDate}
//                 onChange={(value) => setStartDate(value)}
//               />
//             </div>
//             <div className="flex flex-row">
//               <label className="block text-lg font-medium h-12 m-2 p-2">
//                 To
//               </label>
//               <DatePickerInput
//                 value={endDate}
//                 onChange={(value) => setEndDate(value)}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-row w-full gap-4 p-2">
//           <div className="w-1/2 p-5 bg-primaryBackground rounded-xl">
//             <p>Overall Balance</p>
//             <SubHeaderText
//               label={
//                 totalIncome && totalExpense
//                   ? `$ ${(totalIncome - totalExpense).toString()}`
//                   : `$ ${(totalIncome - totalExpense).toString()}`
//               }
//             />
//           </div>
//           <div className="w-1/2 p-5 bg-positiveBackground rounded-xl">
//             <p>Total Income</p>
//             <SubHeaderText label={`$ ${totalIncome}`} />
//           </div>
//           <div className="w-1/2 p-5 bg-negativeBackground rounded-xl">
//             <p className="text-xl">Total Expense</p>
//             <SubHeaderText label={`$ ${totalExpense}`} />
//           </div>
//         </div>
//         <div className="flex p-2 gap-4">
//           <IncomeExpenseYearlyBarChart
//             overallIncomeExpenseData={overallIncomeExpenseData}
//           />

//           {overallMonthlyExpenseData.length > 0 ? (
//             <ExpenseCategoryYearlyBarChart
//               overallMonthlyExpenseData={overallMonthlyExpenseData}
//               categories={categories}
//               colors={COLORS}
//             />
//           ) : (
//             <div>{overallMonthlyExpenseData.length}</div>
//           )}
//         </div>
//         {/* <div className="p-2">
//           <ExpenseTable
//             expenseAllData={filteredExpenseData
//               ?.sort(
//                 (a, b) =>
//                   new Date(b.date).getTime() - new Date(a.date).getTime()
//               )
//               ?.slice(0, 5)}
//             headerRequired={true}
//             headerLabel="Latest Transactions - Expense"
//             pageSize={5}
//           />
//         </div>
//         <div className="p-2">
//           <IncomeTable
//             incomeAllData={filteredIncomeData
//               ?.sort(
//                 (a, b) =>
//                   new Date(b.date).getTime() - new Date(a.date).getTime()
//               )
//               ?.slice(0, 5)}
//             headerRequired={true}
//             headerLabel="Latest Transactions - Income"
//             pageSize={5}
//           />
//         </div> */}
//         <div className="p-2">
//           <ExpenseTable
//             expenseAllData={filteredExpenseData
//               ?.sort(
//                 (a, b) =>
//                   new Date(b.date).getTime() - new Date(a.date).getTime()
//               )
//               ?.slice(0, 5)}
//             headerRequired={true}
//             headerLabel="Latest Transactions - Expense"
//             colSpan={5}
//           />
//         </div>
//         <div className="p-2">
//           <IncomeTable
//             incomeAllData={filteredIncomeData
//               ?.sort(
//                 (a, b) =>
//                   new Date(b.date).getTime() - new Date(a.date).getTime()
//               )
//               ?.slice(0, 5)}
//             headerRequired={true}
//             headerLabel="Latest Transactions - Income"
//             colSpan={4}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;
