import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { RecurringExpenseService } from './recurring-expense.service';
import { RecurringExpenseDto } from './dto/recurring-expense.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { ApiResponse } from 'src/common/utils/api-response.util';
import { UpdateRecurringExpenseDto } from './dto/update-recurring-expense.dto';
import { response } from 'express';

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

  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId')
  async getRecurringExpenseByUserId(@Param('userId') userId: number) {
    const recurringExpenseData =
      await this.recurringExpenseService.getRecurringExpenseByUserId(userId);

    return ApiResponse({
      statusCode: 200,
      statusMessage: 'Recurring expense data retrived.',
      data: recurringExpenseData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update-recurring-expense')
  async updateRecurringExpenseById(
    @Body() updateRecurringEcpenseDto: UpdateRecurringExpenseDto,
  ) {
    const response =
      await this.recurringExpenseService.updateRecurringExpenseById(
        updateRecurringEcpenseDto,
      );
    return ApiResponse({
      statusCode: 201,
      statusMessage: 'Recurring Expense Updates Successfully',
      data: { noOfIncomesUpdated: response },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteExpenseById(@Param('id') id: number) {
    const record =
      await this.recurringExpenseService.deleteRecurringExpenseById(id);

    return ApiResponse({
      statusCode: 200,
      statusMessage: 'Recurring Expense deleted successfully',
      data: { noOfExpensesDeleted: record },
    });
  }
}
