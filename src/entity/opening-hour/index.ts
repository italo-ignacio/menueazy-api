import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { DaysOfWeek as DayOfWeek } from '../../domain/enum';
import { RestaurantEntity } from '../restaurant';

@Entity('opening_hour')
export class OpeningHourEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'enum', name: 'day_of_week', enum: DayOfWeek })
  public dayOfWeek: DayOfWeek;

  @Column({ type: 'time with time zone', name: 'opening_time' })
  public openingTime: string;

  @Column({ type: 'time with time zone', name: 'closing_time' })
  public closingTime: string;

  // @Column({ type: 'integer', name: 'restaurant_id' })
  // public restaurantId: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.openingHourList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'restaurant_id', referencedColumnName: 'id' }])
  public restaurant: RestaurantEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
