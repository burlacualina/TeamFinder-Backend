import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizationService } from './organization.service'; 
import { Organization } from './organization.entity'; 

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  findAll(): Promise<Organization[]> {
    return this.organizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Organization> {
    return this.organizationService.findOne(+id);
  }

  @Post()
  create(@Body() organization: Partial<Organization>): Promise<Organization> {
    return this.organizationService.create(organization);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() organization: Partial<Organization>): Promise<Organization> {
    return this.organizationService.update(+id, organization);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.organizationService.remove(+id);
  }
}
