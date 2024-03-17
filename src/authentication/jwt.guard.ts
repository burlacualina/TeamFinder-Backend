import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      request.user = decodedToken; 
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractJwtFromRequest(request): string | null {
    if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
      return request.headers.authorization.split(' ')[1];
    } else if (request.cookies && request.cookies.jwt) {
      return request.cookies.jwt;
    }
    return null;
  }
}
