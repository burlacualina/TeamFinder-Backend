import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { UsersModule } from './users/user.module';
import { OrganizationModule } from './organization/organization.module';
@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule,OrganizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
