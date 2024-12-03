import { Injectable } from '@nestjs/common';
import { IncomeDto } from './dto/income.dto';
import { Income } from './entities/income.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, EntityManager, Repository } from 'typeorm';
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

    return response.id;
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

    return incomeData;
  }

  async getIncomeByUserIdAndYear(userId: number, year: number) {
    const incomeRecords = await this.incomeRepository.find({
      where: {
        user: { id: userId },
        date: Between(
          new Date(`${year}-01-01T00:00:00.000Z`),
          new Date(`${year}-12-31T23:59:59.999Z`),
        ),
      },
      relations: ['user'],
    });

    const incomeData: IncomeDto[] = incomeRecords.map((record) => ({
      title: record.title,
      description: record.description,
      amount: record.amount,
      date: record.date,
    }));

    return incomeData;
  }
}
