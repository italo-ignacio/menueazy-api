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
import { ProductEntity } from '../product';
import { ProductOptionItemEntity } from '../product-option-item';

@Entity('product_option_group')
export class ProductOptionGroupEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ length: 255, type: 'varchar' })
  public name: string;

  @Column({ nullable: true, type: 'text' })
  public description: string | null;

  @Column({ name: 'min_selection', default: 0, type: 'integer' })
  public minSelection: number;

  @Column({ name: 'max_selection', default: 1, type: 'integer' })
  public maxSelection: number;

  @Column({ type: 'boolean' })
  public required: boolean;

  @Column({ name: 'product_id', type: 'integer' })
  public productId: number;

  @ManyToOne(() => ProductEntity, (product) => product.productOptionGroupList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  public product: ProductEntity;

  @OneToMany(
    () => ProductOptionItemEntity,
    (productOptionItem) => productOptionItem.productOptionGroup,
    { eager: true }
  )
  public productOptionItemList: ProductOptionItemEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
