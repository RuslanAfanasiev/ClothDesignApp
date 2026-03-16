import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthUser {
  uid: string;    // userId din Authify (UUID)
  email: string;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
