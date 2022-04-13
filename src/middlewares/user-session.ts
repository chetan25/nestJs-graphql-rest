import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

// add extra property to Response interface
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

@Injectable()
export class UserJWTSessionMiddleware implements NestMiddleware {
  constructor(
    private userService: UsersService,
    readonly jwtService: JwtService /*, readonly userService: UsersService*/,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const Authorization = req.get('Authorization');
    // console.log('UserSessionMiddleware', Authorization);
    if (!Authorization) {
      throw new UnauthorizedException('Not Authorize');
    }
    if (Authorization) {
      const token = Authorization.replace('Bearer ', '');
      //   console.log(token);
      try {
        const { userId } = this.jwtService.verify(token) as {
          userId: number;
          username: string;
        };
        const user = await this.userService.findById(userId);
        req.userId = userId;
        req.currentUser = user;
      } catch (err) {
        throw new UnauthorizedException('Not Authorize');
      }
    }

    next();
  }
}
