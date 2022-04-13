import { Module, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
// due to our setting in tsconfig we have to import is as require
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { CoreModule } from './core.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(), // registers TypeORM  and it reads the ormconfig file
    CoreModule,
    UsersModule,
    NotesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => {
        // console.log(req);
        return { request: req };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        // make sure incoming request has valid properties
        // and all extra properties are stripped off
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  // configure global middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['dsdwwewew'], // secret
        }),
      )
      .forRoutes('*'); // use it on all routes
  }
}
