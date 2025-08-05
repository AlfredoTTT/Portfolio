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
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => InviteToken, (token) => token.visits, { eager: true , nullable: true})
  inviteToken!: InviteToken;

  @Column()
  ip!: string;

  @Column()
  userAgent!: string;

  @Column()
  language!: string;

  @Column()
  region!: string;

  @Column()
  timezone!: string;

  @Column()
  browser!: string;

  @Column()
  os!: string;

  @Column()
  screenResolution!: string;

  @CreateDateColumn()
  visitedAt!: Date;
}
