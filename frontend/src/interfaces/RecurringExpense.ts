export interface RecurringExpense {
  id?: number;
  title: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  frequency: string;
}
