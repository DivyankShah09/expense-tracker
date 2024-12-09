import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ExpenseService } from 'src/expense/expense.service';
import { RecurringExpenseService } from 'src/recurring-expense/recurring-expense.service';

@Injectable()
export class CronService {
  constructor(
    private readonly recurringExpenseService: RecurringExpenseService,
    private readonly expenseService: ExpenseService,
  ) {}

  @Cron('0 2 * * *')
  async handleCron() {
    try {
      const recurringExpenseRecords =
        await this.recurringExpenseService.getAllRecurringExpenses();

      for (const recurringExpense of recurringExpenseRecords) {
        const nextDate = new Date(recurringExpense.nextDate);
        const currentDate = new Date();

        nextDate.setUTCHours(0, 0, 0, 0);
        currentDate.setUTCHours(0, 0, 0, 0);

        if (nextDate.getTime() === currentDate.getTime()) {
          const expense = {
            title: recurringExpense.title,
            description: recurringExpense.description,
            amount: recurringExpense.amount,
            date: recurringExpense.nextDate,
            category: recurringExpense.category.name,
          };

          const expenseRecord = await this.expenseService.addExpense(
            expense,
            recurringExpense.user,
          );
          console.log('Expense Record added successfully: ', expenseRecord);

          const recurringExpenseUpdated =
            await this.recurringExpenseService.updateNextDate(recurringExpense);
          console.log(
            'Recurring Expense Record updated successfully: ',
            recurringExpenseUpdated,
          );
        }
      }
    } catch (error) {
      console.error('Error during cron job execution: ', error);
    }
  }
}
