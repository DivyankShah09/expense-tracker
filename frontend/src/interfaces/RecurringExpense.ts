export interface RecurringExpense {
  id?: number;
  title: string;
  description: string;
  amount: number;
  nextDate: string;
  category: string;
  frequency: string;
}
