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
import { ProductEntity } from '../product';

@Entity('product_category')
export class ProductCategoryEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  public id: number;

  // @Column({ type: 'integer', name: 'category_id' })
  // public categoryId: number;

  // @Column({ type: 'integer', name: 'product_id' })
  // public productId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.productCategoryList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  public category: CategoryEntity;

  @ManyToOne(() => ProductEntity, (product) => product.productCategoryList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  public product: ProductEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
