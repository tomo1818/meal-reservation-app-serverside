import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { CredentialsDto } from '../users/dto/credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  async login(credentialsDto: CredentialsDto) {
    const { room_number, password } = credentialsDto;
    const user = await this.userService.findOne(room_number);
    if (!user) {
      throw new NotFoundException('ユーザーが存在しません。');
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username: user.name, sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException(
      'ユーザー名またはパスワードを確認してください。',
    );
  }
}
