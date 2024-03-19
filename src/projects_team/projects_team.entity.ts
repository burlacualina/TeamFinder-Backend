import { Entity, PrimaryColumn,Column, PrimaryGeneratedColumn  ,ManyToOne}from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class ProjectTeam{

    @PrimaryGeneratedColumn()
    project_id:number;

    @ManyToOne(() => User)
    user: User;



}