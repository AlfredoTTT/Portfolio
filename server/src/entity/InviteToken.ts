import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { VisitLog } from './VisitLog';

@Entity()
export class InviteToken {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  token!: string;

  @Column({ nullable: true })
  recruiterEmail?: string;

  @Column({ default: false })
  used!: boolean;

  @Column({ nullable: true })
  usedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => VisitLog, (visit) => visit.token)
  visits!: VisitLog[];
}
