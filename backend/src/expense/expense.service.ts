import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Between, EntityManager, Repository } from 'typeorm';
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

  async getExpenseByUserIdAndYear(userId: number, year: number) {
    const expenseRecords = await this.expenseRepository.find({
      where: {
        user: { id: userId },
        date: Between(
          new Date(`${year}-01-01T00:00:00.000Z`),
          new Date(`${year}-12-31T23:59:59.999Z`),
        ),
      },
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
      statusMessage: `Expense Records for ${year} Retrieved Successfully`,
      data: expenseData,
    });
  }

  async getGroupedExpenseData(userId: number, year: number) {
    const queryBuilder = this.expenseRepository
      .createQueryBuilder('expense')
      .select([
        'MONTH(expense.date) AS month',
        'expense.categoryID',
        'category.name AS categoryName', // Select category name
        'SUM(expense.amount) AS amount',
      ])
      .leftJoin('expense.category', 'category') // Join with category table
      .where('expense.userId = :userId', { userId })
      .andWhere('YEAR(expense.date) = :year', { year }) // Filter by year
      .groupBy('MONTH(expense.date)')
      .addGroupBy('expense.categoryID')
      .addGroupBy('category.name') // Group by category name as well
      .orderBy('month', 'ASC');

    // Execute the query
    const expenseData = await queryBuilder.getRawMany();

    return ApiResponse({
      statusCode: 200,
      statusMessage: `Expense Data for Year ${year} Retrieved Successfully`,
      data: expenseData,
    });
  }
}
