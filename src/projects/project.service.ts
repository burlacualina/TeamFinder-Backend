import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(projectData: Partial<Project>): Promise<Project> {
    const project = this.projectRepository.create(projectData);
    return await this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findOne(projectId: number): Promise<Project | undefined> {
    return await this.projectRepository.findOne({ where: { project_id: projectId } });
  }

  async update(projectId: number, projectData: Partial<Project>): Promise<Project | undefined> {
    await this.projectRepository.update(projectId, projectData);
    return this.findOne(projectId);
  }

  async remove(projectId: number): Promise<void> {
    await this.projectRepository.delete(projectId);
  }
}
