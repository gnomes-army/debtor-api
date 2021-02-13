import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface User {
  id: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => ctx.switchToHttp().getRequest().user,
);
