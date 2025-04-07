import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { IngredientMeasure } from '../../domain/enum';
import { IngredientDataEntity } from '../ingredient-data';
import { IngredientMovementEntity } from '../ingredient-movement';
import { ProductIngredientEntity } from '../product-ingredient';
import { RestaurantEntity } from '../restaurant';

@Index('ingredient_restaurant', ['restaurant'])
@Entity('ingredient')
export class IngredientEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ length: 255, type: 'varchar' })
  public name: string;

  @Column({ type: 'float', default: 0 })
  public quantity: number;

  @Column({ type: 'float4', name: 'total_price', default: 0 })
  public totalPrice: number;

  @Column({ type: 'float4', name: 'price_in_stock', default: 0 })
  public priceInStock: number;

  @Column({ type: 'enum', enum: IngredientMeasure })
  public measure: IngredientMeasure;

  @Column({ type: 'float4', nullable: true, name: 'min_alert' })
  public minAlert: number | null;

  @Column({ type: 'text', nullable: true, name: 'image_url' })
  public imageUrl: string | null;

  @Column({ type: 'integer', name: 'restaurant_id' })
  public restaurantId: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.ingredientList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'restaurant_id', referencedColumnName: 'id' }])
  public restaurant: RestaurantEntity;

  @OneToMany(() => ProductIngredientEntity, (productIngredient) => productIngredient.ingredient)
  public productIngredientList: ProductIngredientEntity[];

  @OneToMany(() => IngredientMovementEntity, (ingredientMovement) => ingredientMovement.ingredient)
  public ingredientMovementList: IngredientMovementEntity[];

  @OneToMany(() => IngredientDataEntity, (ingredientData) => ingredientData.ingredient)
  public ingredientDataList: IngredientDataEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
