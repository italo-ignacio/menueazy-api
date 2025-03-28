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

@Index('ingredient_data_ingredient', ['ingredient'])
@Entity('ingredient_data')
export class IngredientDataEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'float4', name: 'entry_quantity' })
  public entryQuantity: number;

  @Column({ type: 'float4', name: 'unit_price' })
  public unitPrice: number;

  @Column({ type: 'float4' })
  public quantity: number;

  @Column({ type: 'timestamptz', nullable: true, name: 'expires_at' })
  public expiresAt: Date | null;

  @Column({ type: 'integer', name: 'ingredient_id' })
  public ingredientId: number;

  @ManyToOne(() => IngredientEntity, (ingredient) => ingredient.ingredientDataList, {
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
