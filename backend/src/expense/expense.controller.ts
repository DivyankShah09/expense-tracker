import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add-expense')
  async addExpense(@Body() createExpenseDto: CreateExpenseDto, @Request() req){
    const user = req.user;
    return this.expenseService.addExpense(createExpenseDto, user);
  }
}
