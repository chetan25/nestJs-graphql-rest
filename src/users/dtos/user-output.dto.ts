import { Expose } from 'class-transformer';

export class UserOutputDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  token: string;
}
