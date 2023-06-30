import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('meals')
export class Meal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: '食事種別' })
  meal_type: number;

  @Column({ comment: '日付' })
  date: string;

  @Column({ comment: '深夜飯かどうか' })
  is_late: number;

  @CreateDateColumn({ comment: '登録日時' })
  readonly created_at?: Timestamp;

  @UpdateDateColumn({ comment: '最終更新日時' })
  readonly updated_at?: Timestamp;

  @ManyToOne(() => User, (user) => user.meals, { eager: true })
  user: User;
}
