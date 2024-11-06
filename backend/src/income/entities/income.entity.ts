import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Income {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column({ type: Date })
  date: Date;

  // Many incomes belong to one user
  @ManyToOne(() => User, (user) => user.incomes)
  user: User;

  constructor(income: Partial<Income>) {
    Object.assign(this, income);
  }
}
