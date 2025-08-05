import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserActivityLog {
   @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  visitId!: string; // relación manual con VisitLog

  @Column()
  action!: string; // Ej: "click", "navigate", "scroll"

  @Column()
  target!: string; // Ej: "#button-contact", "/about"

  @Column({ type: 'text', nullable: true })
  details!: string; // info adicional (puede ser JSON.stringify())

  @CreateDateColumn()
  timestamp!: Date;
}
