import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async createOrganization(name: string, address: string): Promise<Organization> {
    const newOrganization = await this.organizationRepository.save({
      address,
      name,
    });
    return newOrganization;
  }

  async findOrganizations() {
    return await this.organizationRepository.find({ relations: { users: true } });
  }

  async findOrganizationById(id: number) {
    return await this.organizationRepository.findOneBy({ id });
  }
}
