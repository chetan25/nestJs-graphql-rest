import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dtos/create-note.dto';
import { User } from '../users/user.entity';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private noteRepo: Repository<Note>) {}

  async createNote(note: CreateNoteDto, user: User) {
    const newNote = this.noteRepo.create(note);
    // associating note with logged in user
    newNote.user = user;

    const newlyAddedNote = await this.noteRepo.save(newNote);
    console.log(newlyAddedNote);
    (newlyAddedNote as Note & { userId: number }).userId = user.id;
    return newlyAddedNote;
  }

  getNotes(userId: number) {
    return this.noteRepo
      .createQueryBuilder()
      .select('*')
      .where('userId = :userId', { userId: userId })
      .getRawMany();
  }
}
