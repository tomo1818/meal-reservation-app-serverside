import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from './entities/meal.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal) private mealRepository: Repository<Meal>,
  ) {}

  async create(createMealDto: CreateMealDto, user: User) {
    const meal = this.mealRepository.create({
      meal_type: createMealDto.meal_type,
      date: createMealDto.date,
      is_late: createMealDto.is_late,
      user: user,
    });
    await this.mealRepository.save(meal);
    return meal;
  }

  async findByUser(user: User) {
    return await this.mealRepository.findBy({ user: { id: user.id } });
  }

  findAll() {
    return `This action returns all meals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meal`;
  }

  update(id: number, updateMealDto: UpdateMealDto) {
    return `This action updates a #${id} meal`;
  }

  remove(id: number) {
    return `This action removes a #${id} meal`;
  }
}
