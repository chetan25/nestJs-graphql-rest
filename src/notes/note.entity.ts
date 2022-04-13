import { User } from '../users/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;

  @Column({
    default: false,
  })
  completed: boolean;
}
