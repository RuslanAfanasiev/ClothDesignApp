import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

interface AuthifyTokenPayload {
  sub: string;   // email
  userId: string;
}

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  private readonly jwtSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.jwtSecret = this.configService.getOrThrow<string>('JWT_SECRET');
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Missing authorization token');
    }

    try {
      const payload = jwt.verify(token, this.jwtSecret) as AuthifyTokenPayload;
      request['user'] = { uid: payload.userId, email: payload.sub };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractToken(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.slice(7);
    }
    const cookie = request.cookies?.jwt;
    return cookie ?? null;
  }
}
