import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { IngredientEntity } from '../ingredient';
import { ProductEntity } from '../product';

@Index('product_ingredient_unique', ['product', 'ingredient'], { unique: true })
@Index('product_ingredient_product', ['product'])
@Entity('product_ingredient')
export class ProductIngredientEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'float4' })
  public quantity: number;

  @Column({ type: 'boolean', default: true, name: 'can_remove' })
  public canRemove: boolean;

  @Column({ type: 'boolean', default: true, name: 'can_add' })
  public canAdd: boolean;

  @Column({ type: 'integer', default: 9, name: 'max_add_quantity' })
  public maxAddQuantity: number;

  @Column({ type: 'float4', nullable: true, name: 'additional_price' })
  public additionalPrice: number | null;

  @Column({ type: 'integer', name: 'product_id' })
  public productId: number;

  @ManyToOne(() => ProductEntity, (product) => product.productIngredientList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  public product: ProductEntity;

  @Column({ type: 'integer', name: 'ingredient_id' })
  public ingredientId: number;

  @ManyToOne(() => IngredientEntity, (ingredient) => ingredient.productIngredientList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'ingredient_id', referencedColumnName: 'id' }])
  public ingredient: IngredientEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
