import { Injectable } from '@nestjs/common';
import { RecurringExpenseDto } from './dto/recurring-expense.dto';
import { RecurringExpense } from './entities/recurring-expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CategoryService } from 'src/category/category.service';
import { User } from 'src/user/entities/user.entity';
import { ApiResponse } from 'src/common/utils/api-response.util';
import { ExpenseService } from 'src/expense/expense.service';

@Injectable()
export class RecurringExpenseService {
  // Helper function to calculate the next recurrence date based on frequency
  calculateNextDate = (currentDate: Date, frequency: string) => {
    const nextDate = new Date(currentDate);
    nextDate.setUTCHours(10, 0, 0, 0);

    console.log('Current Date: ', nextDate);

    switch (frequency) {
      case 'daily':
        nextDate.setUTCDate(nextDate.getUTCDate() + 1); // Add 1 day for daily recurrence
        break;
      case 'weekly':
        nextDate.setUTCDate(nextDate.getUTCDate() + 7); // Add 7 days for weekly recurrence
        break;
      case 'bi-weekly':
        nextDate.setUTCDate(nextDate.getUTCDate() + 14); // Add 14 days for bi-weekly recurrence
        break;
      case 'tri-weekly':
        nextDate.setUTCDate(nextDate.getUTCDate() + 21); // Add 21 days for tri-weekly recurrence
        break;
      case 'monthly':
        nextDate.setUTCMonth(nextDate.getUTCMonth() + 1); // Add 1 month for monthly recurrence
        break;
      default:
        throw new Error('Invalid frequency');
    }

    return nextDate;
  };

  // Helper function to calculate the next recurrence date based on frequency
  // calculateNextDate = (currentDate: Date, frequency: string) => {
  //   const nextDate = new Date(currentDate);

  //   switch (frequency) {
  //     case 'daily':
  //       nextDate.setUTCDate(nextDate.getUTCDate() + 1); // Add 1 day for daily recurrence
  //       break;
  //     case 'weekly':
  //       nextDate.setUTCDate(nextDate.getUTCDate() + 7); // Add 7 days for weekly recurrence
  //       break;
  //     case 'bi-weekly':
  //       nextDate.setUTCDate(nextDate.getUTCDate() + 14); // Add 14 days for bi-weekly recurrence
  //       break;
  //     case 'tri-weekly':
  //       nextDate.setUTCDate(nextDate.getUTCDate() + 21); // Add 21 days for tri-weekly recurrence
  //       break;
  //     case 'monthly':
  //       // Adjust for monthly recurrence, ensuring the next date is the same day of the month
  //       const currentMonth = nextDate.getUTCMonth();
  //       nextDate.setUTCMonth(currentMonth + 1);

  //       // If the next month has fewer days than the current day, adjust the date to the last day of the next month
  //       if (nextDate.getUTCMonth() !== (currentMonth + 1) % 12) {
  //         nextDate.setUTCDate(0); // This sets the date to the last day of the previous month (next month)
  //       }

  //       // Set time to midnight (00:00:00) to avoid issues with time zone differences
  //       nextDate.setUTCHours(0, 0, 0, 0);
  //       break;
  //     default:
  //       throw new Error('Invalid frequency');
  //   }

  //   return nextDate;
  // };

  constructor(
    @InjectRepository(RecurringExpense)
    private readonly recurringExpenseRepository: Repository<RecurringExpense>,
    private readonly expenseService: ExpenseService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly entityManager: EntityManager,
  ) {}

  async addRecurringExpense(
    recurringExpenseDto: RecurringExpenseDto,
    user: User,
  ) {
    try {
      const { title, description, amount, date, category, frequency } =
        recurringExpenseDto;

      const currentUser = await this.userService.findByEmail(user.email);
      const expenseCategory = await this.categoryService.findByName(category);

      const expenseDto = {
        title,
        description,
        amount,
        date: date,
        category,
      };
      const addExpenseResponse = this.expenseService.addExpense(
        expenseDto,
        currentUser,
      );

      const updatedNextDate = this.calculateNextDate(date, frequency);
      console.log('Updated next date: ', updatedNextDate);

      const recurringExpense = this.recurringExpenseRepository.create({
        title,
        description,
        amount,
        nextDate: updatedNextDate,
        frequency,
        category: expenseCategory,
        user: currentUser,
      });
      const response = await this.entityManager.save(recurringExpense);

      return { expenseId: response.id };
    } catch (error) {
      throw new Error(`Error adding recurring expense: ${error.message}`);
    }
  }

  async getAllRecurringExpenses() {
    try {
      const recurringExpenseRecords =
        await this.recurringExpenseRepository.find({
          relations: ['user', 'category'],
        });

      return recurringExpenseRecords;
    } catch (error) {
      throw new Error(`Error getting recurring expense: ${error.message}`);
    }
  }

  async updateNextDate(recurringExpense: RecurringExpense) {
    const updatedNextDate = this.calculateNextDate(
      recurringExpense.nextDate,
      recurringExpense.frequency,
    );

    recurringExpense.nextDate = updatedNextDate;

    const updatedRecord =
      await this.recurringExpenseRepository.save(recurringExpense);
  }
}
