import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { email, name, phone, password } = createUserDto;

    if (email) {
      const existingEmail = await this.userModel.findOne({ email });
      if (existingEmail) throw new BadRequestException('Емеил уже использован');
    }
    if (name) {
      const existingName = await this.userModel.findOne({ name });
      if (existingName) throw new BadRequestException('Имя уже использовано');
    }
    if (phone) {
      const existingPhone = await this.userModel.findOne({ phone });
      if (existingPhone) throw new BadRequestException('Телефон уже использован');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new this.userModel({ ...createUserDto, password: hashedPassword });
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { email, name, phone } = updateUserDto;

    if (email) {
      const existingEmail = await this.userModel.findOne({ email, _id: { $ne: id } });
      if (existingEmail) throw new BadRequestException('Емеил уже использован');
    }
    if (name) {
      const existingName = await this.userModel.findOne({ name, _id: { $ne: id } });
      if (existingName) throw new BadRequestException('Имя уже использовано');
    }
    if (phone) {
      const existingPhone = await this.userModel.findOne({ phone, _id: { $ne: id } });
      if (existingPhone) throw new BadRequestException('Телефон уже использован');
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) throw new NotFoundException('Пользователь не найден');
    return updatedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('Пользователь не найден');
    return user;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) throw new NotFoundException('Пользователь не найден');
    return deletedUser;
  }


  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) return null;

    return user;
  }

}
