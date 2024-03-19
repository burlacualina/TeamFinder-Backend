import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto, UpdateDepartmentByAdminDto } from './department.dto';
import { UserRole } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { OrganizationService } from '../organization/organization.service';
import { FindUserByIdAndRoleDto } from '../users/user.dtos';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
    private usersService: UserService,
    private organizationsService: OrganizationService,
  ) {}

  async createDepartmentByAdmin(data: CreateDepartmentDto, adminUserId: number) {
    const findUserDto: FindUserByIdAndRoleDto = {
      userId: adminUserId,
      role: UserRole.ADMIN,
      organizationId: data.organizationId,
    };
    const adminUser = await this.usersService.findUserByIdAndRole(findUserDto);
    if (!adminUser) {
      throw new UnauthorizedException('You do not have permission to create departments.');
    }

    const organization = await this.organizationsService.findOrganizationById(data.organizationId);
    if (!organization) {
      throw Error('Organization not found.');
    }

    const department = this.departmentsRepository.create({
      name: data.name,
      organization,
    });
    return await this.departmentsRepository.save(department);
  }

  async findDepartmentById(id: number) {
    const department = await this.departmentsRepository.findOneBy({ id });
    if (!department) {
      throw new NotFoundException('Department not found.');
    }
    return department;
  }

  async updateDepartment(data: UpdateDepartmentByAdminDto) {
    const { adminUserId, departmentId, name } = data;

    const department = await this.departmentsRepository.findOneBy({ id: departmentId });
    if (!department) {
      throw new NotFoundException('Department not found.');
    }
    const adminUser = await this.usersService.findUserByIdAndRole({
      userId: adminUserId,
      role: UserRole.ADMIN,
      organizationId: department.organization.id,
    });
    if (!adminUser) {
      throw new UnauthorizedException('You do not have permission to update this department.');
    }

    if (name) department.name = name;
    await this.departmentsRepository.save(department);
    return department;
  }

  async deleteDepartament(adminUserId: number, departmentId: number) {
    const department = await this.departmentsRepository.findOneBy({ id: departmentId });
    if (!department) {
      throw new NotFoundException('Department not found.');
    }

    const adminUser = await this.usersService.findUserByIdAndRole({
      userId: adminUserId,
      role: UserRole.ADMIN,
      organizationId: department.organization.id,
    });
    if (!adminUser) {
      throw new UnauthorizedException('You do not have permission to delete this department.');
    }
    await this.departmentsRepository.remove(department);
  }



}
