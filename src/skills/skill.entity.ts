import { Column, Entity, PrimaryGeneratedColumn ,ManyToMany,JoinTable} from "typeorm";
import { User } from "src/users/user.entity";
@Entity()

export class Skill{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    skill_name:string;

    @ManyToMany(() => User)
    @JoinTable({ name: 'author_id' })
    users: User;
}