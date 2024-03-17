import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillCategory } from './skill_categories.entity';
import { SkillCategoryService } from './skill_categories.service';
import { SkillCategoryController } from './skill_categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SkillCategory])],
  providers: [SkillCategoryService],
  controllers: [SkillCategoryController],
  exports: [SkillCategoryService],
})
export class SkillCategoryModule {}
