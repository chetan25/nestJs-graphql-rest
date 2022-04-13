import {
  Controller,
  Post,
  Body,
  Session,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInUserDto } from './dtos/siginin-user.dto';
import { AuthenticationService } from './auth.service';
import { Auth } from '../middlewares/auth';
import { UserSerializer } from '../interceptors/serialize-user';
import { UserOutputDto } from './dtos/user-output.dto';
import { CurrentUser } from '../decorators/current-user';
import { User } from './user.entity';

@Controller('auth')
@UserSerializer(UserOutputDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthenticationService,
  ) {}

  @Post('/signup')
  async createNewUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(
      body.email,
      body.password,
      body.name,
    );
    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async signin(@Body() body: SignInUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;

    const token = await this.authService.getCredentials(user);
    console.log(token, 'token');
    return {
      ...user,
      token: await token.access_token,
    };
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
    return 'Logged Out Successfully';
  }

  @Delete('/:id')
  @UseGuards(Auth)
  deleteUser(@Param('id') id: string, @CurrentUser() loggedUser: User) {
    // since all query param and param are string we convert to integer
    return this.usersService.remove(parseInt(id), loggedUser);
  }
}
