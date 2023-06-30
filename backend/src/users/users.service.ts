import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { MealsService } from 'src/meals/meals.service';
import { CreateMealDto } from 'src/meals/dto/create-meal.dto';
import { Meal } from 'src/meals/entities/meal.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly mealsService: MealsService,
  ) {}

  async findOne(roomNumber: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { room_number: roomNumber } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { room_number, name, password, authority } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      room_number,
      name,
      password: hashedPassword,
      authority,
    });
    await this.userRepository.save(user);
    return user;
  }

  async getMeals(roomNumber: string): Promise<Meal[]> {
    const user = await this.userRepository.findOne({
      where: { room_number: roomNumber },
    });
    return await this.mealsService.findByUser(user);
  }

  async createMeal(
    createMealDto: CreateMealDto,
    roomNumber: string,
  ): Promise<Meal> {
    const user = await this.userRepository.findOne({
      where: { room_number: roomNumber },
    });
    return await this.mealsService.create(createMealDto, user);
  }
}
