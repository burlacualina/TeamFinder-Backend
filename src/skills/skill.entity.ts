import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Skill{

    @PrimaryGeneratedColumn()
    skill_id:number;

    @Column()
    skill_name:string;

}