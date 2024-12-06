import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { ExpenseDto } from './dto/expense.dto';
import { ApiResponse } from 'src/common/utils/api-response.util';

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
  @Get('/expense-month-category/:id/:year/:startDate/:endDate')
  async getExpenseByMonthAndCategory(
    @Param('id') id: number,
    @Param('year') year: number,
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
  ) {
    const expenseData = await this.expenseService.getGroupedExpenseData(
      id,
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
  @Get('/:id/:year')
  async getExpenseByUserIdAndYear(
    @Param('id') id: number,
    @Param('year') year: number,
  ) {
    const expenseData = await this.expenseService.getExpenseByUserIdAndYear(
      id,
      year,
    );

    return ApiResponse({
      statusCode: 200,
      statusMessage: `Expense Records for ${year} Retrieved Successfully`,
      data: expenseData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getExpenseByUserId(@Param('id') id: number) {
    const expenseData = await this.expenseService.getExpenseByUserId(id);
    return ApiResponse({
      statusCode: 200,
      statusMessage: 'expense Records Retrieved Successfully',
      data: expenseData,
    });
  }
}
