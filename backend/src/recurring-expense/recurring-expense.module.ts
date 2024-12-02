import { Module } from '@nestjs/common';
import { RecurringExpenseService } from './recurring-expense.service';
import { RecurringExpenseController } from './recurring-expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from 'src/expense/entities/expense.entity';
import { RecurringExpense } from './entities/recurring-expense.entity';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';
import { ExpenseModule } from 'src/expense/expense.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecurringExpense]),
    UserModule,
    ExpenseModule,
    CategoryModule,
  ],
  controllers: [RecurringExpenseController],
  providers: [RecurringExpenseService],
  exports: [RecurringExpenseService],
})
export class RecurringExpenseModule {}
