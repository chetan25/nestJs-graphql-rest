import { Transform, Expose } from 'class-transformer';

export class NoteDisplayDto {
  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  completed: boolean;

  // gets the user id and assign it to userId
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
