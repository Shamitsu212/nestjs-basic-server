import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name is not a string' })
  @IsNotEmpty({ message: 'Name is required' })


  readonly name: string;

  @IsEmail({}, { message: 'Email must be valid' })


  readonly email: string;

  @IsString({ message: 'Password is not a string' })
  @MinLength(8, { message: 'Password too short(<8)' })
  @Matches(/^(?=.*[0-9])/, { message: 'Password must contain number' })


  readonly password: string;

  @IsOptional()
  @Matches(/^\d{10,}$/, {message: 'Phone must contain only digits and be at least 10 digits long',})


  readonly phone?: string;
}
