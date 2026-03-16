import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class FirebaseAuthGuard implements CanActivate {
    private readonly configService;
    private readonly jwtSecret;
    constructor(configService: ConfigService);
    canActivate(context: ExecutionContext): boolean;
    private extractToken;
}
