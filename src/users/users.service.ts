import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // this is how we get the auto generated repository with TypeOrm
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(email: string, password: string, name: string) {
    // since we are using TypeORM we always create a instane and than save it
    const user = this.userRepo.create({ email, password, name });

    // this saves to dB,
    // save and remove are expected to run with entity instances
    // we use the user entity, to make sure the hooks are executed
    // using plain object to save not fire typeorm entity hooks
    return this.userRepo.save(user);
  }

  findById(id: number) {
    if (!id) {
      return null;
    }
    return this.userRepo.findOne(id);
  }

  findByEmail(email: string) {
    // find returns an array
    return this.userRepo.find({
      email: email,
    });
  }

  async remove(id: number, loggedUser: User) {
    if (loggedUser.id !== id) {
      throw new UnauthorizedException('Not Authorize');
    }
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.userRepo.remove(user);
  }
}
