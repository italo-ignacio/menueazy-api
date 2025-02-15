import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { StyleEntity } from '../style';

@Entity('color')
export class ColorEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'varchar', length: 7 })
  public primary: string;

  @Column({ type: 'varchar', name: 'text_primary', length: 7 })
  public textPrimary: string;

  @Column({ type: 'varchar', length: 7 })
  public secondary: string;

  @Column({ type: 'varchar', name: 'text_secondary', length: 7 })
  public textSecondary: string;

  @Column({ type: 'varchar', length: 7 })
  public background: string;

  @Column({ type: 'varchar', length: 7 })
  public text: string;

  @OneToMany(() => StyleEntity, (style) => style.color)
  public styleList: StyleEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', type: 'timestamptz', nullable: true })
  public finishedAt: Date | null;
}
