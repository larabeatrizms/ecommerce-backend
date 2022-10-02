import { Inject, Logger, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

import { User } from '../entities/user.entity';
import { SignInInterface } from '../interfaces/sign-in.interface';
import { UserRepositoryInterface } from '../repositories/user.interface.repository';

export class SignInService {
  private readonly logger = new Logger(SignInService.name);

  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async signIn({ email, password }: SignInInterface): Promise<User | Error> {
    this.logger.log(`Searching user... email: ${email}`);

    const user = await this.userRepository.findByCondition({ email });

    if (!user) {
      this.logger.log('User not found.');

      return new UnauthorizedException('User not found.');
    }

    if (compareSync(password, user.password)) {
      this.logger.log('User found and authenticated');

      return user;
    }

    this.logger.log('Incorrect password.');
    return new UnauthorizedException('Incorrect password.');
  }
}
