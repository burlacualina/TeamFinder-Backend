import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { SkillService } from '../skills/skill.service';
import { AssignSkillsDto, CreateSkillDto, UpdateSkillDto } from './skills.dtos';
import { CreateSkil_Categories } from '../skill-categories/skill_categories.dtos';
import { JwtAuthGuard } from '../authentication/jwt.guard';
import { RolesGuard } from '../authentication/roles.guard';
import { HasRoles } from '../authentication/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.DEPARTMENT_MANAGER)
  async createSkill(@Req() request, @Body() data: CreateSkillDto) {
    const userId = request.user.id;
    return await this.skillsService.create( userId);
  }

  @Post('assign')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async assignSkills(@Req() request, @Body() data: AssignSkillsDto) {
    const userId = request.user.id;
    return await this.skillsService.assignSkills(userId, data.skills);
  }

  @Put(':skillId')
  @UseGuards(JwtAuthGuard)
  async updateSkill(
    @Req() request,
    @Param('skillId') skillId: number,
    @Body() updateData: UpdateSkillDto,
  ) {
    const userId = request.user.id;
    return await this.skillsService.update(userId,skillId, updateData);
  }

  @Delete(':skillId')
  @UseGuards(JwtAuthGuard)
  async deleteSkill(@Req() request, @Param('skillId') skillId: number) {
    const userId = request.user.id;
    return await this.skillsService.delete(userId, skillId);
  }


}