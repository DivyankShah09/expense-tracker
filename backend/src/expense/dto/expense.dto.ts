import { Category } from 'src/category/entities/category.entity';

export class ExpenseDto {
  title: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
}
