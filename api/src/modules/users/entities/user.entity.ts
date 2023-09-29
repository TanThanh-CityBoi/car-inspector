import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Role } from '@roles/entities/role.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 55,
    name: 'username',
  })
  username: string;

  @Column('text', { name: 'password', nullable: false })
  password: string;

  @Column('int', { name: 'role_id', unsigned: true })
  roleId: number;
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({
    name: 'role_id',
  })
  role: Role;

  @Column('varchar', { nullable: true, length: 50, name: 'first_name' })
  firstName: string;

  @Column('varchar', { nullable: true, length: 50, name: 'last_name' })
  lastName: string;

  @Column('varchar', {
    nullable: true,
    length: 256,
    name: 'email',
  })
  email: string;

  @Column('varchar', {
    length: 20,
    unique: true,
    name: 'phone_number',
    nullable: true,
  })
  phoneNumber: string;

  @Column('varchar', { length: 256, name: 'avatar', nullable: true })
  avatar: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  toJSON() {
    delete this.password;
    return this;
  }
}
