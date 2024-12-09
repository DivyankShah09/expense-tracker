import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { ExpenseDto } from './dto/expense.dto';
import { ApiResponse } from 'src/common/utils/api-response.util';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add-expense')
  async addExpense(@Body() expenseDto: ExpenseDto, @Request() req) {
    const user = req.user;
    const response = await this.expenseService.addExpense(expenseDto, user);
    return ApiResponse({
      statusCode: 201,
      statusMessage: 'Expense Added Successfully',
      data: { expenseId: response },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/expense-month-category/:userId/:year/:startDate/:endDate')
  async getExpenseByMonthAndCategory(
    @Param('userId') userId: number,
    @Param('year') year: number,
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
  ) {
    const expenseData = await this.expenseService.getGroupedExpenseData(
      userId,
      year,
      startDate,
      endDate,
    );

    return ApiResponse({
      statusCode: 200,
      statusMessage: `Expense Data for Year ${year} Retrieved Successfully`,
      data: expenseData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId/:year')
  async getExpenseByUserIdAndYear(
    @Param('userId') userId: number,
    @Param('year') year: number,
  ) {
    const expenseData = await this.expenseService.getExpenseByUserIdAndYear(
      userId,
      year,
    );

    return ApiResponse({
      statusCode: 200,
      statusMessage: `Expense Records for ${year} Retrieved Successfully`,
      data: expenseData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId')
  async getExpenseByUserId(@Param('userId') userId: number) {
    const expenseData = await this.expenseService.getExpenseByUserId(userId);
    return ApiResponse({
      statusCode: 200,
      statusMessage: 'expense Records Retrieved Successfully',
      data: expenseData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update-expense')
  async updateExpenseById(@Body() updateExpenseDto: UpdateExpenseDto) {
    const response =
      await this.expenseService.updateExpenseById(updateExpenseDto);
    return ApiResponse({
      statusCode: 201,
      statusMessage: 'Income Updates Successfully',
      data: { noOfIncomesUpdated: response },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getExpenseById(@Param('id') id: number) {
    const expense = await this.expenseService.getExpenseById(id);
    return ApiResponse({
      statusCode: 200,
      statusMessage: 'Expense Retrieved Successfully',
      data: expense,
    });
  }
}
