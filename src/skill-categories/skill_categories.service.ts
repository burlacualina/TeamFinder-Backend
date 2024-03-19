import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillCategory } from './skill_categories.entity';

@Injectable()
export class SkillCategoryService {
  constructor(
    @InjectRepository(SkillCategory)
    private skillCategoryRepository: Repository<SkillCategory>,
  ) {}

  async findAll(): Promise<SkillCategory[]> {
    return await this.skillCategoryRepository.find();
  }

  async findOne(id: number): Promise<SkillCategory | undefined> {
    return await this.skillCategoryRepository.findOne({ where: { id: id} });
  }

  async create(skillCategoryData: Partial<SkillCategory>): Promise<SkillCategory> {
    const skillCategory = await this.skillCategoryRepository.create(skillCategoryData);
    return await this.skillCategoryRepository.save(skillCategory);
  }

  async update(id: number, skillCategoryData: Partial<SkillCategory>): Promise<SkillCategory | undefined> {
    await this.skillCategoryRepository.update(id, skillCategoryData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.skillCategoryRepository.delete(id);
  }
  async findSkillCategoryById(categoryId: number) {
    const category = await this.skillCategoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new NotFoundException('SKill category not found');
    }
    return category;
  }
}

