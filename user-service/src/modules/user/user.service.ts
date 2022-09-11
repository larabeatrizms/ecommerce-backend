import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { compareSync } from 'bcrypt';

import { User } from './entities/user.entity';
import { SignInInterface } from './interfaces/signin.interface';
import { UserInterface } from './interfaces/user.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signIn({ email, password }: SignInInterface): Promise<User | Error> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      return new UnauthorizedException('User not found.');
    }

    if (compareSync(password, user.password)) {
      return user;
    }

    return new UnauthorizedException('Incorrect password.');
  }

  async createUser(user: UserInterface): Promise<InsertResult> {
    try {
      this.logger.log('Creating a user...');

      const userEntity = this.userRepository.create(user);

      const res = await this.userRepository.insert(userEntity);

      this.logger.log(`User created! Email: ${user.email}`);

      return res;
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(error?.message || error);
    }
  }
}
