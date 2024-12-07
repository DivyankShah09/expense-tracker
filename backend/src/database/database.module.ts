import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Expense } from 'src/expense/entities/expense.entity';
import { Income } from 'src/income/entities/income.entity';
import { RecurringExpense } from 'src/recurring-expense/entities/recurring-expense.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.getOrThrow<string>('MYSQL_HOST'); // Replace 'MYSQL_HOST' with appropriate ENV key
        const parsedUrl = new URL(dbUrl);

        return {
          // TODO: change type to 'postgres' for production db
          // type: 'mysql', // dev - db
          type: 'postgres', // prod - db
          host: parsedUrl.hostname,
          port: parseInt(parsedUrl.port, 10),
          username: parsedUrl.username,
          password: parsedUrl.password,
          database: parsedUrl.pathname.replace('/', ''), // Remove leading slash
          autoLoadEntities: true,
          synchronize: configService.get<boolean>('MYSQL_SYNCHRONIZE', true),
          entities: [Category, User, RecurringExpense, Expense, Income],
          timezone: 'UTC', // Use UTC timezone for consistency
          ssl: {
            rejectUnauthorized: false, // Allow self-signed certificates
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
