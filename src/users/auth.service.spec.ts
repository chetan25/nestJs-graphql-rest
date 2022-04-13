import { AuthenticationService } from './auth.service';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

describe('Authentication Service', () => {
  let service: AuthenticationService;
  let fakeUserService: Partial<UsersService>;
  let fakeJwtService: Partial<JwtService>;

  const dummyUser = {
    email: 'test@gmail.com',
    password: 'ewewewe',
    name: 'test',
  };

  beforeEach(async () => {
    fakeJwtService = {
      sign: (payload: string | object | Buffer, options?: JwtSignOptions) => {
        return 'signed-token';
      },
    };
    // lets create fake user store and service
    const users: User[] = [];
    fakeUserService = {
      findByEmail: (email: string) => {
        const filteredUser = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUser);
      },
      create: (email: string, password: string, name: string) => {
        const user = {
          id: Math.floor(Math.random() * 9999),
          email: email,
          password: password,
          name: name,
        } as User;
        users.push(user);

        return Promise.resolve(user);
      },
    };

    // fake DI container
    const module = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: JwtService,
          useValue: fakeJwtService,
        },
      ],
    }).compile();

    // instance of service
    service = module.get(AuthenticationService);
  });

  it('Can create auth service', () => {
    expect(service).toBeDefined();
  });

  it('Test SignUp', async () => {
    const user = await service.signUp(
      dummyUser.email,
      dummyUser.password,
      dummyUser.name,
    );

    expect(user.password).toContain('.');
    expect(user.password).not.toEqual(dummyUser.password);
    expect(user.email).toBe(dummyUser.email);
    expect(user.name).toBe(dummyUser.name);
  });

  it('Should throw error if email already used', async () => {
    // new user
    const user1 = await service.signUp(
      dummyUser.email,
      dummyUser.password,
      dummyUser.name,
    );
    // user2 with same email
    // making jest understand the async
    await expect(
      service.signUp(dummyUser.email, dummyUser.password, dummyUser.name),
    ).rejects.toThrow(BadRequestException);
  });
});
