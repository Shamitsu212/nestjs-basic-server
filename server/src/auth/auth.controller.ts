import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import type { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Пользователь успешно зарегистрирован, возвращает JWT' })
  @ApiResponse({ status: 400, description: 'Емеил, имя или телефон уже заняты' })

  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')

  @ApiOperation({ summary: 'Логин пользователя' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'Успешный вход' })
  @ApiResponse({ status: 401, description: 'Неверный емеил или пароль' })

  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('logout')

  @ApiOperation({ summary: 'Выход пользователя' })
  @ApiResponse({ status: 200, description: 'Cookie очищенны' })

  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt'); 
    return { message: 'Выход успешен' };
  }
}
