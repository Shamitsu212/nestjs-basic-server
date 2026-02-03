import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Ivan', description: 'Имя пользователя' })
  @IsString({ message: 'Имя не string' })
  @IsNotEmpty({ message: 'Имя обязательно' })


  readonly name: string;

  @ApiProperty({ example: 'ivan@example.com', description: 'Email пользователя' })
  @IsEmail({}, { message: 'Неправильный емеил' })


  readonly email: string;

  @ApiProperty({ example: 'pass1234', description: 'Пароль пользователя' })
  @IsString({ message: 'Пароль не string' })
  @MinLength(8, { message: 'Пароль слишком короткий' })
  @Matches(/^(?=.*[0-9])/, { message: 'Пароль должен включать цифру' })


  readonly password: string;

  @ApiProperty({ example: '123456789', description: 'Телефон пользователя', required: false })
  @IsOptional()
  @Matches(/^\d{10,}$/, {message: 'Телефон должен состоять только из цифр',})


  readonly phone?: string;
}
