import { Expense } from 'src/expense/entities/expense.entity';
import { Income } from 'src/income/entities/income.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  // One user can have many incomes.
  @OneToMany(() => Income, (income) => income.user, { cascade: true })
  incomes: Income[];

  // One user can have many expenses.
  @OneToMany(() => Expense, (expense) => expense.user, { cascade: true })
  expenses: Expense[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
