import { MonthEnum } from "../enums/monthEnum";
import { Expense, ExpenseByMonthCategory } from "../interfaces/Expense";

export const generateIncomeExpenseData = (
  monthlyIncomeSum: number[], // Array of monthly income sums
  monthlyExpenseSum: number[] // Array of monthly expense sums
) => {
  const months = Object.keys(MonthEnum).filter((key) => isNaN(Number(key)));

  return months
    .map((month, index) => ({
      month,
      income: monthlyIncomeSum[index] || 0, // Default to 0 if no data
      expense: monthlyExpenseSum[index] || 0, // Default to 0 if no data
    }))
    .filter((data) => data.income > 0 || data.expense > 0); // Filter out months with no data
};

export const generateMonthlyExpenseData = (expenseDataByMonthCategory: {
  data: ExpenseByMonthCategory[] | undefined;
}) => {
  const overallMonthlyExpenseData: any[] = [];

  for (let month = 1; month <= 12; month++) {
    const monthlyData: { month: string; [key: string]: any } = {
      month: MonthEnum[month - 1], // Get month name from MonthEnum
    };

    const expensesForMonth = expenseDataByMonthCategory?.data?.filter(
      (expense) => expense.month === month
    );

    if (expensesForMonth && expensesForMonth.length > 0) {
      expensesForMonth.forEach((expense) => {
        const formattedCategory = expense.categoryName
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
        monthlyData[formattedCategory] = expense.amount;
      });
    }

    // If there is any data for the month (other than the month name), push it to the result
    if (Object.keys(monthlyData).length > 1) {
      overallMonthlyExpenseData.push(monthlyData);
    }
  }

  return overallMonthlyExpenseData;
};

export const generateExpenseCategoryPieChartData = (
  categories: string[],
  filteredExpenseData: Expense[] | undefined
) => {
  const pieChartData: { name: string; value: number }[] = [];

  categories.forEach((category) => {
    const pieChartEntry = {
      name: category,
      value: 0,
    };

    filteredExpenseData?.forEach((expense) => {
      if (expense.category === category) {
        pieChartEntry.value += expense.amount;
      }
    });

    pieChartData.push(pieChartEntry);
  });

  return pieChartData;
};
