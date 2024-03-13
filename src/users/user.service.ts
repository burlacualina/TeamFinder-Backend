import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateEmployeeDto } from './user.dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(name: string, email: string, password: string) {
    const user = await this.userRepository.save({ name, email, password });
    return user;
  }

  async createEmployee(data: CreateEmployeeDto) {
    const employee = await this.createUser(data.name,data.email,data.password);
    console.log(data);
    return employee;
  }


  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {id:id}
    });
  }
}
