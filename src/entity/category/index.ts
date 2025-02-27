import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ProductCategoryEntity } from '../product-category';
import { RestaurantEntity } from '../restaurant';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: `varchar`, name: 'name', length: 100 })
  public name: string;

  @Column({ type: `text`, name: 'description', nullable: true })
  public description: string | null;

  @Column({ type: 'integer', name: 'restaurant_id' })
  public restaurantId: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.categoryList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'restaurant_id', referencedColumnName: 'id' }])
  public restaurant: RestaurantEntity;

  @OneToMany(() => ProductCategoryEntity, (productCategory) => productCategory.category)
  public productCategoryList: ProductCategoryEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
