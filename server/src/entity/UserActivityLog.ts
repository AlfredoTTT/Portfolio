import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserActivityLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  action!: string;

  @Column('jsonb', { nullable: true })
  metadata?: any;

  @Column({ nullable: true })
  token?: string;

  @Column()
  ip!: string;

  @Column()
  userAgent!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
