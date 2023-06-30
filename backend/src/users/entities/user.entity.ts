import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Meal } from 'src/meals/entities/meal.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, comment: 'ルーム番号' })
  room_number: string;

  @Column({ comment: 'ユーザー名' })
  name: string;

  @Column({ comment: 'パスワード' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ comment: '権限' })
  authority: number;

  @CreateDateColumn({ comment: '登録日時' })
  readonly created_at?: Timestamp;

  @UpdateDateColumn({ comment: '最終更新日時' })
  readonly updated_at?: Timestamp;

  @OneToMany(() => Meal, (meal) => meal.user)
  meals: Meal[];
}
