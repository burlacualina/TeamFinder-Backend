import {  IsEmail,  IsString, IsNumber,IsEnum ,IsOptional} from 'class-validator';
import {Project_period} from '../projects/project.entity';
import { UserRole } from './user.entity';
export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  organizationId?: number;
}

export class CreateAdminDto{
    @IsString()
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    password: string;
  
    @IsString()
    orgName: string;
  
    @IsString()
    orgAddress: string;
  }

  export class LoginAdminDto {
    @IsEmail()
    email: string;
  
    @IsString()
    password: string;
  }

  export class CreateProjectDto {
    @IsNumber()
    project_id: number;

    @IsString()
    nume: string;

    @IsEnum(Project_period) 
    project_period: Project_period;

    @IsString()
    start_date: string;

    @IsString()
    deadline_date: string;

    @IsString()
    description_string: string;
  }

  export class CreateSkillDto{

    @IsNumber()
    skill_id:number;

    @IsString()
    skill_name:string;
  }
  export class FindUserByIdAndRoleDto {
    @IsNumber()
    userId: number;
  
    @IsString()
    role: UserRole;
  
    @IsNumber()
    organizationId: number;
  }
  