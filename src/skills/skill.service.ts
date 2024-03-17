import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,In } from 'typeorm';
import { Skill } from './skill.entity';
import { UserService } from 'src/users/user.service';
import { AssignSkillsDto, CreateSkillDto, UpdateSkillDto } from './skills.dtos';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
    private readonly userService: UserService,
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

  async update(userId: number, skillId: number, updateData: UpdateSkillDto) {
    const skill = await this.skillRepository.findOne({
      where: { skill_id: skillId },
      relations: ['author'],
    });
    if (!skill) {
      throw new NotFoundException('Skill not found.');
    }
   // if (skill.users.id !== userId) {
   //   throw new UnauthorizedException('You can only update skills you have created.');
   // }

    Object.assign(skill, updateData);
    await this.skillRepository.save(skill);
    return skill;
  }
  async remove(id: number): Promise<void> {
    await this.skillRepository.delete(id);
  }
  
  async delete(userId: number, skillId: number): Promise<void> {
    // Check if the skill exists for the given user
    const skill = await this.skillRepository.findOne({
      where: { id: skillId, userId: userId } as Partial<Skill>, 
  });

    if (!skill) {
      throw new NotFoundException(`Skill with ID ${skillId} not found for user with ID ${userId}`);
    }

 
    await this.skillRepository.delete(skillId);
  }

  async assignSkills(userId: number, skillNames: string[]): Promise<void> {
    const user = await this.userService.findUserById(userId);
    
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const skillsToAdd: Skill[] = [];

    for (const skillName of skillNames) {
      const existingSkill = await this.skillRepository.findOne({ where: { skill_name: skillName } });

      if (existingSkill) {
        skillsToAdd.push(existingSkill);
      } else {
        const newSkill = await this.skillRepository.create({ skill_name: skillName });
        skillsToAdd.push(newSkill);
      }
    }

   // user.skills = [...user.skills, ...skillsToAdd];
   // await this.userService.update(userId,user);
  }
}