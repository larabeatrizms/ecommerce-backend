import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  Unique,
} from 'typeorm';
import { hash } from 'bcryptjs';
import { IsEmail, IsString, Min } from 'class-validator';
import { UserInterface } from '../interfaces/user.interface';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Min(8)
  @IsString()
  password: string;

  @Column({ name: 'first_name' })
  @IsString()
  firstName: string;

  @Column({ name: 'last_name' })
  @IsString()
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
