import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateNoteDto } from './dtos/create-note.dto';
import { Note } from './note.entity';
import { NotesService } from './notes-service';
import { UserJWT } from './interceptors/auth';

@UseGuards(UserJWT)
@Resolver('Note')
export class NotesResolver {
  constructor(private noteService: NotesService) {}

  @Query('notes')
  async getNotes(@Context() ctx: any) {
    return this.noteService.getNotes(ctx.request.userId);
  }

  @Query('note')
  async getNote() {
    return 'Hello';
  }

  @Mutation('createNote')
  async create(
    @Args('createNoteInput') args: CreateNoteDto,
    @Context() ctx: any,
  ): Promise<Note> {
    console.log(ctx.request.currentUser, 'ctx.request.currentUser');
    const createdNote = await this.noteService.createNote(
      args,
      ctx.request.currentUser,
    );
    return createdNote;
  }
}
