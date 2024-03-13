import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateEmployeeDto } from './user.dtos';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(parseInt(id, 10));
  }

  @Post()
  async createEmployee(@Body() data:CreateEmployeeDto ){
   return await this.userService.createEmployee(data);
  }
}
