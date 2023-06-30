import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMealDto {
  @IsNumber()
  @IsNotEmpty()
  meal_type: number;

  @IsString({ message: '日付は必須です' })
  @IsNotEmpty()
  date: string;

  @IsNumber()
  is_late: number;
}
