import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { RecurringExpenseService } from './recurring-expense.service';
import { RecurringExpenseDto } from './dto/recurring-expense.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { ApiResponse } from 'src/common/utils/api-response.util';

@Controller('recurring-expense')
export class RecurringExpenseController {
  constructor(
    private readonly recurringExpenseService: RecurringExpenseService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add-recurring-expense')
  async addRecurringExpensae(
    @Body() recurringExpenseDto: RecurringExpenseDto,
    @Request() req,
  ) {
    const user = req.user;

    const response = await this.recurringExpenseService.addRecurringExpense(
      recurringExpenseDto,
      user,
    );

    return ApiResponse({
      statusCode: 201,
      statusMessage: 'Recurring Expense Added Successfully',
      data: { expenseId: response },
    });
  }
}
