import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy'; 

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'process.env.JWT_SECRET_KEY', 
      signOptions: { expiresIn: '1d' }, 
    }),
  ],
  providers: [AuthService, JwtStrategy], 
  exports: [AuthService], 
})
export class AuthModule {}
