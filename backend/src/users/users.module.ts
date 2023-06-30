import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { MealsService } from 'src/meals/meals.service';
import { Meal } from 'src/meals/entities/meal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Meal])],
  providers: [UsersService, MealsService],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController],
})
export class UsersModule {}
