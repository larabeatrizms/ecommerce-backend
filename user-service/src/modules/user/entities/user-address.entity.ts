import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { User } from './user.entity';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  street: string;

  @Column({ name: 'postal_code' })
  @Matches(/^[0-9]{5}-[0-9]{3}$/)
  postalCode: string;

  @Column()
  @IsNumber()
  number: number;

  @Column()
  @IsString()
  city: string;

  @Column()
  @IsString()
  state: string;

  @Column()
  @IsString()
  neighborhood: string;

  @Column()
  @IsOptional()
  @IsString()
  complement?: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
