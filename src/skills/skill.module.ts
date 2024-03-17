import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { SkillService } from './skill.service';
import { SkillsController } from './skill.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [SkillService],
  controllers: [SkillsController],
  exports: [SkillService] // If you want to export the SkillService for use in other modules
})
export class SkillModule {}
