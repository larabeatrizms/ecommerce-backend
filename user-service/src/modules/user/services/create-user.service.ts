import { Inject, Logger } from '@nestjs/common';

import { CreateUserInterface } from '../interfaces/create-user.interface';
import { RpcException } from '@nestjs/microservices';
import { ISuccessResponse } from 'src/shared/interfaces/SuccessResponse.interface';
import { UserRepositoryInterface } from '../repositories/user.interface.repository';

export class CreateUserService {
  private readonly logger = new Logger(CreateUserService.name);

  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async createUser(
    user: CreateUserInterface,
  ): Promise<ISuccessResponse | Error> {
    try {
      this.logger.log('Creating a user...');

      this.logger.log('Validating fields...');

      const userAlreadyCreated = await this.userRepository.findByCondition({
        email: user.email,
      });

      if (userAlreadyCreated) {
        throw new RpcException('Este e-mail já está cadastrado.');
      }

      await this.userRepository.create(user);

      this.logger.log(`User created! Email: ${user.email}`);

      return {
        success: true,
        message: 'User created!',
      };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(error?.message || error);
    }
  }
}
