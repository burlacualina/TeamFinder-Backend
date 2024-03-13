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

  async findAll(): Promise<Organization[]> {
    return await this.organizationRepository.find();
  }

  async findOne(id: number): Promise<Organization> {
    return await this.organizationRepository.findOne({where : {id
    }});
  }

  async create(organization: Partial<Organization>): Promise<Organization> {
    return await this.organizationRepository.save(organization);
  }

  async update(id: number, organization: Partial<Organization>): Promise<Organization> {
    await this.organizationRepository.update(id, organization);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.organizationRepository.delete(id);
  }
}
