import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { CategoryEntity } from '../category';
import { RestaurantEntity } from '../restaurant';

@Entity('restaurant_category')
export class RestaurantCategoryEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  // @Column({ type: 'integer', name: 'category_id' })
  // public categoryId: number;

  // @Column({ type: 'integer', name: 'restaurant_id' })
  // public restaurantId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.restaurantCategoryList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  public category: CategoryEntity;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.restaurantCategoryList, {
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
