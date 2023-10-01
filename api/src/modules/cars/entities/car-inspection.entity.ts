import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Cars } from './car.entity';
import { User } from '@users/entities/user.entity';
import { UnsatisCriteria } from './unsatis-criteria.entity';

@Entity({ name: 'car_inspection' })
export class CarInspection extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column('int', { name: 'score', nullable: true })
  score: number;

  @Column('int', { name: 'total_score', default: 223 })
  totalScore: number;

  @Column('int', { name: 'car_id', unsigned: true })
  carId: number;
  @ManyToOne(() => Cars, (car) => car.id)
  @JoinColumn({
    name: 'car_id',
  })
  car: Cars;

  @OneToMany(() => UnsatisCriteria, (criteria) => criteria.carInspection)
  unsatisCriteria: UnsatisCriteria[];

  @Column('int', { name: 'created_by', unsigned: true })
  createdBy: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'created_by',
  })
  creator: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
