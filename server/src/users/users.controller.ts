import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { User } from './schemas/user.schema';

@ApiTags('Users')


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()

  @ApiOperation({ summary: 'Создание нового пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно создан', type: User })
  @ApiResponse({ status: 400, description: 'Некорректные данные или email/name/phone уже заняты' })
  @ApiBody({ type: CreateUserDto })

  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, description: 'Список пользователей', type: [User] })

  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')

  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiParam({ name: 'id', description: 'ID пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь найден', type: User })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })

  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')

  @ApiOperation({ summary: 'Обновить пользователя по ID' })
  @ApiParam({ name: 'id', description: 'ID пользователя' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Пользователь успешно обновлён', type: User })
  @ApiResponse({ status: 400, description: 'Некорректные данные или email/name/phone уже заняты' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })

  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')

  @ApiOperation({ summary: 'Удалить пользователя по ID' })
  @ApiParam({ name: 'id', description: 'ID пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно удалён', type: User })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
