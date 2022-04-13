import { Note } from '../notes/note.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';

// import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // @Exclude()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  // typeOrm hooks like AfterInsert allow to
  // define function on entity that are called automatically

  @AfterInsert()
  logInsert() {
    console.log(`This id was inserted ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`This id was updated ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`This id was removed ${this.id}`);
  }
}
