import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateExpenseDto {
  title: string;
  description: string;
  amount: number;
  date: Date;
  user: User;
  category: Category;
}
