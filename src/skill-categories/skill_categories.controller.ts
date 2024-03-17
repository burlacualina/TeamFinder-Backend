import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SkillCategoryService} from './skill_categories.service';
import { SkillCategory } from './skill_categories.entity';

@Controller('skill-categories')
export class SkillCategoryController {
  constructor(private readonly skillCategoryService: SkillCategoryService) {}

  @Get()
  findAll(): Promise<SkillCategory[]> {
    return this.skillCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SkillCategory | undefined> {
    return this.skillCategoryService.findOne(+id);
  }

  @Post()
  create(@Body() skillCategoryData: Partial<SkillCategory>): Promise<SkillCategory> {
    return this.skillCategoryService.create(skillCategoryData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() skillCategoryData: Partial<SkillCategory>): Promise<SkillCategory | undefined> {
    return this.skillCategoryService.update(+id, skillCategoryData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.skillCategoryService.remove(+id);
  }
}
