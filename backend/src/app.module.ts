import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { IncomeModule } from './income/income.module';
import { ExpenseModule } from './expense/expense.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { RecurringExpenseModule } from './recurring-expense/recurring-expense.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    IncomeModule,
    ExpenseModule,
    CategoryModule,
    AuthModule,
    RecurringExpenseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
