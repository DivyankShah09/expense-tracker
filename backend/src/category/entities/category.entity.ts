import { Expense } from 'src/expense/entities/expense.entity';
import { RecurringExpense } from 'src/recurring-expense/entities/recurring-expense.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // One category can have many expenses
  @ManyToMany(() => Expense, (expense) => expense.category, { cascade: true })
  expenses: Expense[];

  @ManyToMany(
    () => RecurringExpense,
    (recurringExpense) => recurringExpense.category,
    { cascade: true },
  )
  recurringExpenses: RecurringExpense[];

  constructor(category: Partial<Category>) {
    Object.assign(this, category);
  }
}
