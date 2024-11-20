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

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add-expense')
  async addExpense(@Body() expenseDto: ExpenseDto, @Request() req) {
    const user = req.user;
    return this.expenseService.addExpense(expenseDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/expense-month-category/:id/:year/:startDate/:endDate')
  async getExpenseByMonthAndCategory(
    @Param('id') id: number,
    @Param('year') year: number,
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
  ) {
    return this.expenseService.getGroupedExpenseData(
      id,
      year,
      startDate,
      endDate,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/:year')
  async getExpenseByUserIdAndYear(
    @Param('id') id: number,
    @Param('year') year: number,
  ) {
    return this.expenseService.getExpenseByUserIdAndYear(id, year);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getExpenseByUserId(@Param('id') id: number) {
    return this.expenseService.getExpenseByUserId(id);
  }
}
