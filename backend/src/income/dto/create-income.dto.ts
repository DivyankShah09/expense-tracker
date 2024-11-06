import { User } from 'src/user/entities/user.entity';

export class CreateIncomeDto {
  title: string;
  description: string;
  amount: number;
  date: Date;
}
