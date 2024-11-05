import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
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

  async addIncome(createIncomeDto: CreateIncomeDto, user: User) {
    const { title, description, amount, date } = createIncomeDto;
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
}
