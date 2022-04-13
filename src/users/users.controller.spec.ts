import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthenticationService } from './auth.service';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const fakeAuthService: Partial<AuthenticationService> = {};
  const fakeUserService: Partial<UsersService> = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthenticationService,
          useValue: fakeAuthService,
        },
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
