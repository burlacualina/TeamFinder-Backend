import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateAdminDto, CreateEmployeeDto } from './user.dtos';
import { OrganizationService } from 'src/organization/organization.service';
import { FindUserByIdAndRoleDto } from './user.dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private organizationsService : OrganizationService,
  ) {}

  async createUser(name: string, email: string, password: string) {
    const user = await this.userRepository.save({ name, email, password ,});
    return user;
  }

  async createEmployee(data: CreateEmployeeDto) {
    const organization = await this.organizationsService.findOrganizationById(data.organizationId);

    const employee = await this.createUser(data.name,data.email, data.password,);
    return employee;
  }


async createOrgAndAdmin(data: CreateAdminDto) {
  const organization = await this.organizationsService.createOrganization(
    data.orgName,
    data.orgAddress,
  );
  const admin = await this.createUser(
    data.name,
    data.email,
    data.password,
  );
  return admin;
}
async findUserByIdAndRole(data: FindUserByIdAndRoleDto) {
  return await this.userRepository.findOne({
    where: {
      id: data.userId,
      role: data.role,
      organization: { id: data.organizationId },
    },
    relations: ['organization'],
  });
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
