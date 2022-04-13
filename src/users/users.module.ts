import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller
import { UsersController } from './users.controller';
// Services
import { UsersService } from './users.service';
import { AuthenticationService } from './auth.service';
// Entity
import { User } from './user.entity';
import { LoggedUserMiddleware } from '../middlewares/logged-user';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // PassportModule,
    // JwtModule.register({
    //   secret: 'weewewwe',
    //   signOptions: { expiresIn: '600s' },
    // }),
  ], // this typeORm line creates the User repo automatically
  providers: [UsersService, AuthenticationService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggedUserMiddleware).forRoutes('*');
  }
}
