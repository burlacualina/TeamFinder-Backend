import { Column, Entity, NumericType, PrimaryColumn, PrimaryGeneratedColumn ,OneToMany } from "typeorm";
import { User } from '../users/user.entity';
 
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
 }