import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Plan } from './plan.entitiy';
export interface IQutoa {
  fromDate: Date;
  toDate: Date;
  amount: number;
  planId: number;
}

@Entity()
export class Quota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fromDate: Date;

  @Column()
  toDate: Date;

  @Column({ default: 0, type: 'float' })
  amount: number;

  @OneToOne(() => Plan)
  @JoinColumn({ name: 'planId' })
  plan: Plan;

  @Column({ default: false })
  deleted: boolean;
}
