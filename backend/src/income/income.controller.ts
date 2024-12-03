import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeDto } from './dto/income.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { ApiResponse } from 'src/common/utils/api-response.util';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add-income')
  async addIncome(@Body() createIncomeDto: IncomeDto, @Request() req) {
    const user = req.user;
    const response = this.incomeService.addIncome(createIncomeDto, user);

    return ApiResponse({
      statusCode: 201,
      statusMessage: 'Income Added Successfully',
      data: { incomeId: response },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/:year')
  async getIncomeByUserIdAndYear(
    @Param('id') id: number,
    @Param('year') year: number,
  ) {
    const incomeData = this.incomeService.getIncomeByUserIdAndYear(id, year);
    return ApiResponse({
      statusCode: 200,
      statusMessage: 'Income Records Retrieved Successfully',
      data: incomeData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getIncomeByUserId(@Param('id') id: number) {
    const incomeData = this.incomeService.getIncomeByUserId(id);

    return ApiResponse({
      statusCode: 200,
      statusMessage: 'Income Records Retrieved Successfully',
      data: incomeData,
    });
  }
}
