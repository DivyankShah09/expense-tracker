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
    const { title, description, amount, date, category, frequency } =
      recurringExpenseDto;
    console.log(user);

    const currentUser = await this.userService.findByEmail(user.email);
    const expenseCategory = await this.categoryService.findByName(category);

    const expenseDto = {
      title,
      description,
      amount,
      date,
      category,
    };
    const addExpenseResponse = this.expenseService.addExpense(
      expenseDto,
      currentUser,
    );

    const nextDate = new Date(date);
    nextDate.setUTCDate(nextDate.getUTCDate() + 7);
    console.log(nextDate);

    const recurringExpense = this.recurringExpenseRepository.create({
      title,
      description,
      amount,
      nextDate,
      frequency,
      category: expenseCategory,
      user: currentUser,
    });
    const response = await this.entityManager.save(recurringExpense);

    return ApiResponse({
      statusCode: 201,
      statusMessage: 'Recurring Expense Added Successfully',
      data: { expenseId: response.id },
    });
  }
}
