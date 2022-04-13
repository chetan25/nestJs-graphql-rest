import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { CurrentUser } from '../decorators/current-user';
import { Auth } from '../middlewares/auth';
import { User } from '../users/user.entity';
import { CreateNoteDto } from './dtos/create-note.dto';
import { NotesService } from './notes-service';
import { NoteSerializer } from '../interceptors/serialize-note';
import { NoteDisplayDto } from './dtos/note-display.dto';

@Controller('notes')
@UseGuards(Auth)
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  @NoteSerializer(NoteDisplayDto)
  createNote(@Body() body: CreateNoteDto, @CurrentUser() loggedUser: User) {
    return this.notesService.createNote(body, loggedUser);
  }

  @Get('/:id')
  getNotes(@Param('id') id: number, @CurrentUser() loggedUser: User) {
    if (loggedUser.id != id) {
      throw new UnauthorizedException('Not Authorized');
    }
    return this.notesService.getNotes(loggedUser.id);
  }
}
