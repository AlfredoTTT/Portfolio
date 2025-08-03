import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { InviteToken } from './InviteToken';

@Entity()
export class VisitLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => InviteToken, (token) => token.visits, { eager: true })
  token!: InviteToken;

  @Column()
  ip!: string;

  @Column()
  userAgent!: string;

  @CreateDateColumn()
  visitedAt!: Date;
}
