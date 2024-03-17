import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from '../users/user.entity'
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class UsersModule {}
