import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import type { LoginUserDto } from './dto/login-user.dto';
import type { CreateUserDto } from '../users/dto/create-user.dto';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user: UserDocument = await this.usersService.create(createUserDto);

    const payload = { sub: user._id.toString(), email: user.email };
    const token = this.jwtService.sign(payload, { expiresIn: '30d' });

    return { access_token: token };
  }

  async login(loginUserDto: LoginUserDto) {
    const user: UserDocument | null = await this.usersService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Невалидные данные');
    }

    const payload = { sub: user._id.toString(), email: user.email };
    const token = this.jwtService.sign(payload, { expiresIn: '30d' });

    return { access_token: token };
  }
}
