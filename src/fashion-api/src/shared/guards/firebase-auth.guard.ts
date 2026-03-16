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

    console.log('[Guard] Authorization header:', request.headers.authorization);
    console.log('[Guard] Cookie jwt:', request.cookies?.jwt);
    console.log('[Guard] Token extracted:', token ? token.slice(0, 30) + '...' : 'NULL');
    console.log('[Guard] Secret:', this.jwtSecret ? 'loaded' : 'MISSING');

    if (!token) {
      throw new UnauthorizedException('Missing authorization token');
    }

    try {
      const payload = jwt.verify(token, this.jwtSecret) as AuthifyTokenPayload;
      console.log('[Guard] SUCCESS, user:', payload.userId, payload.sub);
      request['user'] = { uid: payload.userId, email: payload.sub };
      return true;
    } catch (err) {
      console.log('[Guard] JWT error:', err.message);
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
