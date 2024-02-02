import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    // console.log('herer', GqlExecutionContext.create(context).getContext().req);
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
