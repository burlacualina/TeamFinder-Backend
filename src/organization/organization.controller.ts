import { Controller, Get, Post, Body} from '@nestjs/common';
import { RolesGuard} from 'src/authentication/roles.guard';
import { UserRole } from 'src/users/user.entity';
import { HasRoles } from 'src/authentication/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/jwt.guard';
import { CreateOrganizationDto } from './organization.dto'; 
import { OrganizationService } from './organization.service';

@Controller('organizations')
export class OrganizationController {
  constructor(private organizationsService: OrganizationService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN)
  findOrganizations() {
    return this.organizationsService.findOrganizations();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN)
  createOrganization(@Body() data: CreateOrganizationDto) {
    return this.organizationsService.createOrganization(data.name, data.address);
  }
}