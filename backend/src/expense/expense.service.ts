import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Between, EntityManager, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CategoryService } from 'src/category/category.service';
import { ExpenseDto } from './dto/expense.dto';
import { User } from 'src/user/entities/user.entity';
import { ApiResponse } from 'src/common/utils/api-response.util';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { response } from 'express';

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
    const currentDate = new Date(date);
    currentDate.setUTCHours(10, 0, 0, 0);

    const expense = this.expenseRepository.create({
      title,
      description,
      amount,
      date: currentDate,
      category: expenseCategory,
      user: currentUser,
    });

    const response = await this.expenseRepository.save(expense);

    return response.id;
  }

  async getExpenseByUserId(userId: number) {
    const expenseRecords = await this.expenseRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'category'],
    });

    const expenseData: ExpenseDto[] = expenseRecords.map((record) => ({
      id: record.id,
      title: record.title,
      description: record.description,
      amount: record.amount,
      date: record.date,
      category: record.category.name,
    }));

    return expenseData;
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

    return expenseData;
  }

  formatDate = (date: string | Date) => {
    if (!date) return null;
    const d = new Date(date);
    return d instanceof Date && !isNaN(d.getTime())
      ? d.toISOString().split('T')[0]
      : null; // 'YYYY-MM-DD'
  };

  async getGroupedExpenseData(
    userId: number,
    year: number,
    startDate: Date,
    endDate: Date,
  ) {
    const formattedStartDate = this.formatDate(startDate);
    const formattedEndDate = this.formatDate(endDate);

    const queryBuilder = this.expenseRepository
      .createQueryBuilder('expense')
      .select([
        // 'EXTRACT(MONTH FROM expense.date) AS month', // mysql
        // TODO:
        'CAST(EXTRACT(MONTH FROM expense.date) AS INTEGER) AS month', // postgres sql
        'expense.categoryId',
        'category.name AS "categoryName"', // Select category name
        'SUM(expense.amount) AS amount',
      ])
      .leftJoin('expense.category', 'category') // Join with category table
      .where('expense.userId = :userId', { userId })
      .andWhere('EXTRACT(YEAR FROM expense.date) = :year', { year }) // Use EXTRACT for year
      .andWhere(formattedStartDate ? 'expense.date >= :startDate' : '1=1', {
        startDate: formattedStartDate,
      }) // Add start date filter if valid
      .andWhere(formattedEndDate ? 'expense.date <= :endDate' : '1=1', {
        endDate: formattedEndDate,
      }) // Add end date filter if valid
      .groupBy('EXTRACT(MONTH FROM expense.date)')
      .addGroupBy('expense.categoryId')
      .addGroupBy('category.name') // Group by category name as well
      .orderBy('month', 'ASC');

    // Execute the query
    const expenseData = await queryBuilder.getRawMany();

    return expenseData;
  }

  async updateExpenseById(updateExpenseDto: UpdateExpenseDto) {
    const { id, title, description, amount, date, category } = updateExpenseDto;
    const expenseCategory = await this.categoryService.findByName(category);
    const currentDate = new Date(date);
    currentDate.setUTCHours(10, 0, 0, 0);

    const response = await this.expenseRepository.update(id, {
      title,
      description,
      amount,
      date: currentDate,
      category: expenseCategory,
    });

    return response.affected;
  }

  async getExpenseById(id: number) {
    const record = await this.expenseRepository.findOne({
      where: { id },
      relations: ['user', 'category'],
    });

    const expense: ExpenseDto = {
      id: record.id,
      title: record.title,
      description: record.description,
      amount: record.amount,
      date: record.date,
      category: record.category.name,
    };

    return expense;
  }
}
