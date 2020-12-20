import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entitiy';

export interface IPlan {
  id: number;
  title: string;
  user: User;
  description: string;
  period: number;
  goal: number;
  unit: number;
  subfix: string;
}

@Entity()
export class Plan {
  constructor(rawPlan?: Partial<IPlan>) {
    if (rawPlan) {
      this.id = rawPlan.id;
    }
  }
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  period: number;

  @Column({ type: 'float' })
  goal: number;

  @Column({ type: 'float' })
  unit: number;

  @Column()
  subfix: string;

  @Column({ default: false })
  deleted: boolean;
}
