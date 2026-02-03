import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, phone } = createUserDto;

    if (email) {
      const existingEmail = await this.userModel.findOne({ email });
      if (existingEmail) throw new BadRequestException('Email already in use');
    }
    if (name) {
      const existingName = await this.userModel.findOne({ name });
      if (existingName) throw new BadRequestException('Name already in use');
    }
    if (phone) {
      const existingPhone = await this.userModel.findOne({ phone });
      if (existingPhone) throw new BadRequestException('Phone already in use');
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { email, name, phone } = updateUserDto;

    if (email) {
      const existingEmail = await this.userModel.findOne({ email, _id: { $ne: id } });
      if (existingEmail) throw new BadRequestException('Email already in use');
    }
    if (name) {
      const existingName = await this.userModel.findOne({ name, _id: { $ne: id } });
      if (existingName) throw new BadRequestException('Name already in use');
    }
    if (phone) {
      const existingPhone = await this.userModel.findOne({ phone, _id: { $ne: id } });
      if (existingPhone) throw new BadRequestException('Phone already in use');
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) throw new NotFoundException('User not found');
    return deletedUser;
  }
}
