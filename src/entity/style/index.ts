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
import { ColorEntity } from '../color';
import { CompanyEntity } from '../company';
import { RestaurantEntity } from '../restaurant';

@Entity('style')
export class StyleEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @Column({ type: 'boolean', default: false })
  public generic: boolean;

  // @Column({ type: 'integer', name: 'color_id' })
  // public colorId: number;

  // @Column({ type: 'integer', name: 'company_id' })
  // public companyId: number;

  @ManyToOne(() => ColorEntity, (color) => color.styleList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'color_id', referencedColumnName: 'id' }])
  public color: ColorEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.styleList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  public company: CompanyEntity;

  @OneToMany(() => RestaurantEntity, (restaurant) => restaurant.style)
  public restaurantList: RestaurantEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
