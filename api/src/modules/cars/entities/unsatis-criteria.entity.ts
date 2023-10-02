import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CarInspection } from './car-inspection.entity';

@Entity({ name: 'unsatis_criteria' })
export class UnsatisCriteria extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column('int', { name: 'car_inpection_id', unsigned: true })
  carInspectionId: number;

  @ManyToOne(() => CarInspection, (inspection) => inspection.id)
  @JoinColumn({
    name: 'car_inpection_id',
  })
  carInspection: CarInspection;

  @Column('text', { name: 'criteria_id' })
  criteriaId: string;

  @Column('text', { name: 'content', nullable: true })
  content: string;
}
