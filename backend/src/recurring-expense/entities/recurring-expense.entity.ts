import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class RecurringExpense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  nextDate: Date;

  @Column()
  frequency: string;

  @ManyToOne(() => Category, (category) => category.recurringExpenses)
  category: Category;

  @ManyToOne(() => User, (user) => user.recurringExpenses)
  user: User;

  constructor(recurringExpense: Partial<RecurringExpense>) {
    Object.assign(this, recurringExpense);
  }
}
