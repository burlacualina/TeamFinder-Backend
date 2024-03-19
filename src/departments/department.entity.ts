import {Column,Entity,JoinColumn, ManyToOne,OneToMany,PrimaryGeneratedColumn,} from 'typeorm';
import { Organization } from '../organization/organization.entity';
import { User } from '../users/user.entity';

  
@Entity('departments')
export class Department {
@PrimaryGeneratedColumn()
id: number;
  
@Column()
name: string;
  
@ManyToOne(() => Organization, (organization) => organization.departments)
organization: Organization;
  
@ManyToOne(() => User, { nullable: true })
@JoinColumn({ name: 'department_manager_id' })
manager: User;
  
}