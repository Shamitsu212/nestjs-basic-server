import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Ivan', description: 'Имя пользователя' })
  @IsString({ message: 'Name is not a string' })
  @IsNotEmpty({ message: 'Name is required' })


  readonly name: string;

  @ApiProperty({ example: 'ivan@example.com', description: 'Email пользователя' })
  @IsEmail({}, { message: 'Email must be valid' })


  readonly email: string;

  @ApiProperty({ example: 'pass1234', description: 'Пароль пользователя' })
  @IsString({ message: 'Password is not a string' })
  @MinLength(8, { message: 'Password too short(<8)' })
  @Matches(/^(?=.*[0-9])/, { message: 'Password must contain number' })


  readonly password: string;

  @ApiProperty({ example: '123456789', description: 'Телефон пользователя', required: false })
  @IsOptional()
  @Matches(/^\d{10,}$/, {message: 'Phone must contain only digits and be at least 10 digits long',})


  readonly phone?: string;
}
