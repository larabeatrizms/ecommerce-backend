import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';

import { SignInService } from './services/sign-in.service';
import { ShowUserService } from './services/show-user.service';
import { CreateUserService } from './services/create-user.service';

import { UserPaymentRepository } from './repositories/user-payment/user-payment.repository';
import { UserAddressRepository } from './repositories/user-address/user-address.repository';
import { UserRepository } from './repositories/user/user.repository';

import { User } from './entities/user.entity';
import { UserAddress } from './entities/user-address.entity';
import { UserPayment } from './entities/user-payment.entity';
import { UpdateUserProfileService } from './services/update-user-profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAddress, UserPayment])],
  providers: [
    SignInService,
    CreateUserService,
    ShowUserService,
    UpdateUserProfileService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: 'UserAddressRepositoryInterface',
      useClass: UserAddressRepository,
    },
    {
      provide: 'UserPaymentRepositoryInterface',
      useClass: UserPaymentRepository,
    },
  ],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
