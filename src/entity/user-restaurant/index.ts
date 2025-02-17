import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { RestaurantRole } from '../../domain/enum';
import { RestaurantEntity } from '../restaurant';
import { UserEntity } from '../user';

@Entity('user_restaurant')
export class UserRestaurantEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column('enum', {
    name: 'restaurant_role',
    enum: RestaurantRole
  })
  public restaurantRole: RestaurantRole;

  // @Column({ type: 'integer', name: 'restaurant_id' })
  // public restaurantId: number;

  // @Column({ type: 'integer', name: 'user_id' })
  // public userId: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.userRestaurantList, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'restaurant_id', referencedColumnName: 'id' }])
  public restaurant: RestaurantEntity;

  @ManyToOne(() => UserEntity, (user) => user.userRestaurantList, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  public user: UserEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
