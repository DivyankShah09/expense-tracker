import { Expense } from 'src/expense/entities/expense.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // One category can have many expenses
  @OneToMany(() => Expense, (expense) => expense.category, { cascade: true })
  expenses: Expense[];

  constructor(category: Partial<Category>) {
    Object.assign(this, category);
  }
}
