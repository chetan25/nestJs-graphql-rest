import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './notes.controller';
import { NotesService } from './notes-service';
import { Note } from './note.entity';
import { NotesResolver } from './notes.resolver';
import { UsersModule } from '../users/users.module';
import { UserJWTSessionMiddleware } from '../middlewares/user-session';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), UsersModule],
  providers: [NotesService, NotesResolver],
  controllers: [NotesController],
})
export class NotesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserJWTSessionMiddleware)
      .forRoutes({ path: 'graphql', method: RequestMethod.POST });
  }
}
