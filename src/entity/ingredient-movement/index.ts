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
import { IngredientMovementType } from '../../domain/enum';
import { IngredientEntity } from '../ingredient';

@Index('ingredient_movement_ingredient', ['ingredient'])
@Entity('ingredient_movement')
export class IngredientMovementEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'enum', enum: IngredientMovementType })
  public type: IngredientMovementType;

  @Column({ type: 'float4', nullable: true, name: 'old_quantity' })
  public oldQuantity: number | null;

  @Column({ type: 'float4' })
  public quantity: number;

  @Column({ type: 'integer', name: 'ingredient_id' })
  public ingredientId: number;

  @ManyToOne(() => IngredientEntity, (ingredient) => ingredient.ingredientMovementList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'ingredient_id', referencedColumnName: 'id' }])
  public ingredient: IngredientEntity;

  @Column({ type: 'integer', name: 'order_id', nullable: true })
  public orderId: number | null;

  @Column({ type: 'integer', name: 'user_id' })
  public userId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
