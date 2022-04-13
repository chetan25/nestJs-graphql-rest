import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class UserJWT implements CanActivate {
  constructor(
    readonly jwtService: JwtService /*, readonly userService: UsersService*/,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().request;
    const Authorization = request.get('Authorization');

    if (Authorization) {
      const token = Authorization.replace('Bearer ', '');
      //   console.log(token);
      const { userId } = this.jwtService.verify(token) as {
        userId: number;
        username: string;
      };
      //   console.log(userId, 'userID');
      return !!userId;
    }
  }
}
