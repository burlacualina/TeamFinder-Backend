import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateEmployeeDto,CreateAdminDto } from './user.dtos';


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
  
  @Get('email/:email')
  async findUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findUserByEmail(email);
  } 

  @Post()
  async createEmployee(@Body() data:CreateEmployeeDto ){
   return await this.userService.createEmployee(data);
  }
  @Post('admin')
  async createAdmanOrg(@Body() data: CreateAdminDto)
  {return await this.userService.createAdmanOrg(data);}

  
}

