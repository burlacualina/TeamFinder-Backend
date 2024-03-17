import { Column, Entity, NumericType, PrimaryColumn, PrimaryGeneratedColumn ,OneToMany } from "typeorm";
import { User } from '../users/user.entity';
import { SkillCategory } from "src/skill-categories/skill_categories.entity";
 @Entity()
 export class Organization {

    @PrimaryGeneratedColumn()
    id:number; 

    @Column()
    name:string;

    @Column()
    adress:string; 

    @OneToMany(() => User, user => user.organization)
    users: User[];
    //@OneToMany(() => SkillCategory, (skillCategory) => skillCategory.organization)
    //skillCategory: SkillCategory[];
 }