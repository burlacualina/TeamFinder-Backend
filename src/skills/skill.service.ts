import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../skills/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async findAll(): Promise<Skill[]> {
    return await this.skillRepository.find();
  }

  async findOne(id: number): Promise<Skill> {
    return await this.skillRepository.findOne({ where: { skill_id: id } });
  }

  async create(skill: Partial<Skill>): Promise<Skill> {
    return await this.skillRepository.save(skill);
  }

  async update(id: number, skill: Partial<Skill>): Promise<Skill> {
    await this.skillRepository.update(id, skill);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.skillRepository.delete(id);
  }
}
