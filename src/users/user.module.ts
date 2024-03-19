import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './user.entity'
import { OrganizationService } from 'src/organization/organization.service';
import { OrganizationModule } from 'src/organization/organization.module';
@Module({
  imports: [TypeOrmModule.forFeature([User]),forwardRef(()=>OrganizationModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule.forFeature([User]), UserService],
})
export class UsersModule {}
