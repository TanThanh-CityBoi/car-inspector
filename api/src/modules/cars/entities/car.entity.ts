import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'cars' })
export class Cars extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column('text', {
    nullable: false,
    name: 'name',
  })
  name: string;

  //   @OneToMany(() => CarInspection, (car_inspection) => car_inspection.car)
  //   inspections: CarInspection[];

  @Column('varchar', { length: 256, name: 'thumbnail', nullable: false })
  thumbnail: string;

  @Column('jsonb', { name: 'images', nullable: false })
  images: Array<string>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
