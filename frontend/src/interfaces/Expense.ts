export interface Expense {
  id?: number;
  title: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface ExpenseByMonthCategory {
  month: number;
  categoryId: number;
  categoryName: string;
  amount: number;
}
