import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateAdminDto, CreateEmployeeDto } from './user.dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(name: string, email: string, password: string) {
    const user = await this.userRepository.save({ name, email, password ,});
    return user;
  }

  async createEmployee(data: CreateEmployeeDto) 
  {
    const employee = await this.createUser(data.name,data.email,data.password);
    return employee;
  }

async createAdmanOrg(data:CreateAdminDto)
{
  const admin=await this.userRepository.save(data);
  return admin;
}

async findAllUsers(): Promise<User[]> 
{
    return this.userRepository.find();
}

async findUserById(id: number): Promise<User>
 {
  return this.userRepository.findOne({
      where: {id:id} });
  }
async findUserByEmail(email:string)
{
  return this.userRepository.findOne({ where:{email}});
}

async update(id: number, userData: Partial<User>): Promise<User> {
  const user = await this.userRepository.findOne({
    where: {id:id} });

  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
  const updatedUser = { ...user, ...userData };
  await this.userRepository.save(updatedUser);
  return updatedUser;
}
}
