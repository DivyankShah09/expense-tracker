import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { EntityManager, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CategoryService } from 'src/category/category.service';
import { ExpenseDto } from './dto/expense.dto';
import { User } from 'src/user/entities/user.entity';
import { ApiResponse } from 'src/common/utils/api-response.util';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly entityManager: EntityManager,
  ) {}

  async addExpense(expenseDto: ExpenseDto, user: User) {
    const { title, description, amount, date, category } = expenseDto;
    const currentUser = await this.userService.findByEmail(user.email);
    const expenseCategory = await this.categoryService.findByName(category);

    const expense = this.expenseRepository.create({
      title,
      description,
      amount,
      date,
      category: expenseCategory,
      user: currentUser,
    });

    const response = await this.entityManager.save(expense);

    return ApiResponse({
      statusCode: 201,
      statusMessage: 'Expense Added Successfully',
      data: { expenseId: response.id },
    });
  }

  async getExpenseByUserId(userId: number) {
    const expenseRecords = await this.expenseRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'category'],
    });

    const expenseData: ExpenseDto[] = expenseRecords.map((record) => ({
      title: record.title,
      description: record.description,
      amount: record.amount,
      date: record.date,
      category: record.category.name,
    }));

    return ApiResponse({
      statusCode: 200,
      statusMessage: 'expense Records Retrieved Successfully',
      data: expenseData,
    });
  }
}
