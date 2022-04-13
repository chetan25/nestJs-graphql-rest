import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// custom decorator is outside of DI system
// and cannot directly get access to services.
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    //context can be use to intercept any kind of request
    //data is any argument that we pass to our decoration at invocation
    // we can type data as never, and prevent it form getting any argument

    // underlying http request
    const request = context.switchToHttp().getRequest();

    // bcs of the LoggedUserMiddleware we can access currentUser from request
    return request.currentUser;
  },
);
