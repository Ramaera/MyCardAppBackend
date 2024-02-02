import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Admin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const user = GqlExecutionContext.create(ctx).getContext().req.user;
    // Assuming user roles are stored in an array named 'roles'
    return user && user.roles && user.roles.includes('admin');
  },
);

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const user = GqlExecutionContext.create(ctx).getContext().req.user;
    // Assuming user roles are stored in an array named 'roles'

    return user && user.roles && user.roles.includes('user');
  },
);
