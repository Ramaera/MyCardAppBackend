import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserEntity = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // console.log('ctx', GqlExecutionContext.create(ctx).getContext());
    return GqlExecutionContext.create(ctx).getContext().req.user;
  },
);
