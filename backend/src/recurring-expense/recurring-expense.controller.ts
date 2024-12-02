import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { RecurringExpenseService } from './recurring-expense.service';
import { RecurringExpenseDto } from './dto/recurring-expense.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('recurring-expense')
export class RecurringExpenseController {
  constructor(
    private readonly recurringExpenseService: RecurringExpenseService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add-recurring-expense')
  create(@Body() recurringExpenseDto: RecurringExpenseDto, @Request() req) {
    // console.log(req);

    const user = req.user;
    return this.recurringExpenseService.addRecurringExpense(
      recurringExpenseDto,
      user,
    );
  }
}
