import { IsString, MinLength, IsBooleanString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @MinLength(4)
  title: string;

  @IsString()
  @MinLength(5)
  description: string;

  @IsBooleanString()
  completed: boolean;
}
