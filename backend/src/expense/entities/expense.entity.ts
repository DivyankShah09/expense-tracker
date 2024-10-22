import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @ManyToOne(() => Category, (category) => category.expenses)
  category: Category;

  @ManyToOne(() => User, (user) => user.expenses)
  user: User;

  constructor(expense: Partial<Expense>) {
    Object.assign(this, expense);
  }
}
