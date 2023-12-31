import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CredentialsDto {
  @IsString()
  @IsNotEmpty()
  room_number: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;
}
