import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../organization/organization.entity';

@Entity('skills-categories')
export class SkillCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Organization, (organization) => organization.skillCategory)
  organization: Organization;


}