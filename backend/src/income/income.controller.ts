import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add-income')
  async addIncome(@Body() createIncomeDto: CreateIncomeDto, @Request() req) {
    const user = req.user;
    return this.incomeService.addIncome(createIncomeDto, user);
  }
}
