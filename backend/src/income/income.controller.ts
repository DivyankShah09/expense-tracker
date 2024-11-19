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

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add-income')
  async addIncome(@Body() createIncomeDto: IncomeDto, @Request() req) {
    const user = req.user;
    return this.incomeService.addIncome(createIncomeDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/:year')
  async getIncomeByUserIdAndYear(
    @Param('id') id: number,
    @Param('year') year: number,
  ) {
    return this.incomeService.getIncomeByUserIdAndYear(id, year);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getIncomeByUserId(@Param('id') id: number) {
    return this.incomeService.getIncomeByUserId(id);
  }
}
