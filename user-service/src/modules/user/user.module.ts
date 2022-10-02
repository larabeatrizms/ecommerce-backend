import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';

import { CreateUserService } from './services/create-user.service';
import { SignInService } from './services/sign-in.service';

import { UserRepository } from './repositories/user.repository';
import { UserAddressRepository } from './repositories/user-address.repository';

import { User } from './entities/user.entity';
import { UserAddress } from './entities/user-address.entity';
import { ShowUserService } from './services/show-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAddress])],
  providers: [
    SignInService,
    CreateUserService,
    ShowUserService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: 'UserAddressRepositoryInterface',
      useClass: UserAddressRepository,
    },
  ],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
