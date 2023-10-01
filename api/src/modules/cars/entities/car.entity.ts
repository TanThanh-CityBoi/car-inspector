import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { CarInspection } from './car-inspection.entity';

@Entity({ name: 'cars' })
export class Cars extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column('text', {
    nullable: false,
    name: 'name',
  })
  name: string;

  @OneToMany(() => CarInspection, (car_inspection) => car_inspection.car)
  inspections: CarInspection[];

  @Column('varchar', { length: 256, name: 'thumbnail', nullable: false })
  thumbnail: string;

  @Column('json', { name: 'images', nullable: false })
  images: Array<string>;

  @Column('varchar', { length: 256, name: 'model', nullable: true })
  model: string;

  @Column('varchar', { length: 256, name: 'sku', nullable: false })
  sku: string;

  @Column('int', { name: 'km', nullable: true })
  km: number;

  @Column('int', { name: 'space', nullable: true })
  space: number;

  @Column('varchar', { length: 256, name: 'location', nullable: true })
  location: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
