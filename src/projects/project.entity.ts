import { Column, Entity,ManyToOne,JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "src/organization/organization.entity";

export enum Project_period {
    FIXED = 'fixed',
    ONGOING = 'ongoing',
  }

export enum ProjectStatus {
    NOT_STARTED = 'not_started',
    STARTING = 'starting',
    IN_PROGRES = 'in_progres',
    CLOSING = 'closing',
    CLOSED = 'closed',
  }
@Entity()
export class Project{

  @PrimaryGeneratedColumn()
  project_id: number;

@Column()
nume:string;

@Column({
  type: 'enum',
  enum: Project_period,
  default: Project_period.FIXED,
})
project_period: Project_period;

@Column()
start_date:string;

@Column()
deadline_date:string;

@Column()
description:string;

@Column({
  type: 'enum',
  enum: ProjectStatus,
})
status: ProjectStatus;

@ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

}