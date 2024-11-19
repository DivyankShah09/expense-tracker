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
  @Get('/expense-month-category')
  async getExpenseByMonthAndCategory() {
    return this.expenseService.getGroupedExpenseData();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getExpenseByUserId(@Param('id') id: number) {
    return this.expenseService.getExpenseByUserId(id);
  }
}
