export class RecurringExpenseDto {
  id?: number;
  title: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
  frequency: string;
}
