import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users/users.service';

// add extra property to Response interface
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class LoggedUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.usersService.findById(userId);

      //   (req as Request & { currentUser: User }).currentUser = user;
      // add currentUser to the request object for later reference
      req.currentUser = user;
    }

    next();
  }
}
