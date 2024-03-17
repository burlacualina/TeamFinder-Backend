import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { CreateEmployeeDto, LoginAdminDto  } from '../users/user.dtos';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(data:LoginAdminDto): Promise<any> {
    const user = await this.usersService.findUserByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async registerUser(createUserDto: CreateEmployeeDto ): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService. createEmployee({...createUserDto, password: hashedPassword,});
    return user;
  }
  async generateJWT(user: User) {
    const payload = { id: user.id, role: user.role };
    console.log(process.env.JWT_SECRET_KEY);
    return await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET_KEY });
  }

  async login(data: LoginAdminDto) {
    const user = await this.validateUser(data);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const token = await this.generateJWT(user);
    return {
      accesToken: token,
      organizationName: user.organization.name,
      organizationAdmin: user.name,
    };

}
}
