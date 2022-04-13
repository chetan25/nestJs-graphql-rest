import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { User } from './user.entity';

const scryptPromisify = promisify(scrypt);

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UsersService,
    private jwtTokenService: JwtService,
  ) {}

  async signUp(email: string, password: string, name: string) {
    const user = await this.userService.findByEmail(email);
    if (user.length > 0) {
      throw new BadRequestException('Email already exists');
    }
    // hash password
    // randomBytes retuns buffer and we convert it into hexa decimal string
    // 8 represents the bytes and 1 byte = 2 char in hex
    const salt = randomBytes(8).toString('hex');

    const hash = (await scryptPromisify(password, salt, 32)) as Buffer;

    // contains the salt and the hashed password value
    const hashedPassword = salt + '.' + hash.toString('hex');

    return this.userService.create(email, hashedPassword, name);
  }

  async signIn(email: string, password: string) {
    const users = await this.userService.findByEmail(email);
    if (users.length == 0) {
      throw new NotFoundException('Email or Password incorrect');
    }

    const [salt, hashPassword] = users[0].password.split('.');

    const hashGiven = (await scryptPromisify(password, salt, 32)) as Buffer;

    if (hashGiven.toString('hex') !== hashPassword) {
      throw new BadRequestException('Email or Password incorrect');
    }

    return users[0];
  }

  async getCredentials(user: User) {
    const payload = { username: user.name, userId: user.id };

    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }
}
