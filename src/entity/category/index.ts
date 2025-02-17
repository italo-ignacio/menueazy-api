import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ProductCategoryEntity } from '../product-category';
import { RestaurantCategoryEntity } from '../restaurant-category';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: `varchar`, name: 'name', length: 100 })
  public name: string;

  @Column({ type: `text`, name: 'description', nullable: true })
  public description: string | null;

  // @Column({ name: 'company_id', type: 'integer' })
  // public companyId: number;

  @OneToMany(() => ProductCategoryEntity, (productCategory) => productCategory.category)
  public productCategoryList: ProductCategoryEntity[];

  @OneToMany(() => RestaurantCategoryEntity, (restaurantCategory) => restaurantCategory.category)
  public restaurantCategoryList: RestaurantCategoryEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
