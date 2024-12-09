import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeDto } from './dto/income.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { ApiResponse } from 'src/common/utils/api-response.util';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add-income')
  async addIncome(@Body() createIncomeDto: IncomeDto, @Request() req) {
    const user = req.user;
    const response = await this.incomeService.addIncome(createIncomeDto, user);

    return ApiResponse({
      statusCode: 201,
      statusMessage: 'Income Added Successfully',
      data: { incomeId: response },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId/:year')
  async getIncomeByUserIdAndYear(
    @Param('userId') userId: number,
    @Param('year') year: number,
  ) {
    const incomeData = await this.incomeService.getIncomeByUserIdAndYear(
      userId,
      year,
    );
    return ApiResponse({
      statusCode: 200,
      statusMessage: 'Income Records Retrieved Successfully',
      data: incomeData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId')
  async getIncomeByUserId(@Param('userId') userId: number) {
    const incomeData = await this.incomeService.getIncomeByUserId(userId);

    return ApiResponse({
      statusCode: 200,
      statusMessage: 'Income Records Retrieved Successfully',
      data: incomeData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update-income')
  async updateIncomeById(@Body() updateIncomeDto: UpdateIncomeDto) {
    const response = await this.incomeService.updateIncomeById(updateIncomeDto);
    return ApiResponse({
      statusCode: 201,
      statusMessage: 'Expense Updates Successfully',
      data: { noOfExpenseUpdated: response },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getIncomeById(@Param('id') id: number) {
    const income = await this.incomeService.getIncomeById(id);

    return ApiResponse({
      statusCode: 200,
      statusMessage: 'Income Retrieved Successfully',
      data: income,
    });
  }
}
