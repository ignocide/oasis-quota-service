import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
export interface IUser {
  id: number;
  firebaseUid: string;
}

@Entity()
export class User {
  constructor(user?: Partial<IUser>) {
    if (user) {
      this.id = user.id;
    }
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  firebaseUid: string;
}
