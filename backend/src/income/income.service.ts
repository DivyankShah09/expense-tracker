import { Injectable } from '@nestjs/common';
import { IncomeDto } from './dto/income.dto';
import { Income } from './entities/income.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ApiResponse } from 'src/common/utils/api-response.util';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private readonly incomeRepository: Repository<Income>,
    private readonly userService: UserService,
    private readonly entityManager: EntityManager,
  ) {}

  async addIncome(incomeDto: IncomeDto, user: User) {
    const { title, description, amount, date } = incomeDto;
    const currentUser = await this.userService.findByEmail(user.email);

    const income = this.incomeRepository.create({
      title,
      description,
      amount,
      date,
      user: currentUser,
    });

    const response = await this.entityManager.save(income);

    return ApiResponse({
      statusCode: 201,
      statusMessage: 'Income Added Successfully',
      data: { incomeId: response.id },
    });
  }

  async getIncomeByUserId(userId: number) {
    const incomeRecords = await this.incomeRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    const incomeData: IncomeDto[] = incomeRecords.map((record) => ({
      title: record.title,
      description: record.description,
      amount: record.amount,
      date: record.date,
    }));

    return ApiResponse({
      statusCode: 200,
      statusMessage: 'Income Records Retrieved Successfully',
      data: incomeData,
    });
  }
}
