import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateMealDto } from 'src/meals/dto/create-meal.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':room_number/meals')
  async getMeals(@Param('room_number') roomNumber: string) {
    const meals = await this.usersService.getMeals(roomNumber);
    if (!meals) {
      throw new InternalServerErrorException('食事が見つかりません');
    }
    return meals;
  }

  @Post(':room_number/meals')
  async createMeal(
    @Param('room_number') roomNumber: string,
    @Body() createMealDto: CreateMealDto,
  ) {
    await this.usersService.createMeal(createMealDto, roomNumber);
  }
}
