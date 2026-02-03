import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'ivan@example.com', description: 'Емеил пользователя' })
  @IsEmail()


  readonly email: string;

  @ApiProperty({ example: 'Passw0rd1', description: 'Пароль пользователя' })
  @IsString()


  readonly password: string;
}
