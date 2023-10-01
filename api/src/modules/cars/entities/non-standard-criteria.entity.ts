import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'non_standard_criteria' })
export class NonStandardCriteria extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column('int', { name: 'car_inpection_id' })
  carInspectionId: number;

  @Column('int', { name: 'criteria_id' })
  criteriaId: number;

  @Column('text', { name: 'note', nullable: true })
  note: string;
}
