import { Inject, Logger } from '@nestjs/common';

import { CreateUserInterface } from '../dtos/create-user.interface';
import { RpcException } from '@nestjs/microservices';
import { ISuccessResponse } from 'src/shared/interfaces/SuccessResponse.interface';
import { UserRepositoryInterface } from '../repositories/user.interface.repository';
import { UserAddressRepositoryInterface } from '../repositories/user-address.interface.repository';
import { validate } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserService {
  private readonly logger = new Logger(CreateUserService.name);

  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('UserAddressRepositoryInterface')
    private readonly userAddressRepository: UserAddressRepositoryInterface,
  ) {}

  async createUser(
    data: CreateUserInterface,
  ): Promise<ISuccessResponse | Error> {
    try {
      this.logger.log('Creating a user...');

      const { address, ...userData } = data;

      this.logger.log('Validating fields...');

      const userAlreadyCreated = await this.userRepository.findByCondition({
        email: userData.email,
      });

      if (userAlreadyCreated) {
        throw new RpcException('Este e-mail já está cadastrado.');
      }

      const user = await this.userRepository.create(userData);

      this.logger.log(`User created! Email: ${userData.email}`);

      const addressData = {
        user_id: user.id,
        ...address,
      };

      await this.userAddressRepository.create(addressData);

      this.logger.log(`UserAddress created! Address: ${addressData.street}`);

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
