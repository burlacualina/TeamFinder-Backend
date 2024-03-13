import { Entity ,Column, PrimaryGeneratedColumn,ManyToOne} from "typeorm";
import { Organization } from '../organization/organization.entity';

export enum UserRole {
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
    PROJECT_MANAGER = 'project-manager',
    DEPARTMENT_MANAGER = 'department-manager',
  }
@Entity()
export class User{
 @PrimaryGeneratedColumn()
 id:number;

 @Column()
 name:string;

 @Column()
 email:string;

 @Column()
 password:string;

 @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
 role:UserRole;

@ManyToOne(() => Organization, organization => organization.users)
organization: Organization; 
}