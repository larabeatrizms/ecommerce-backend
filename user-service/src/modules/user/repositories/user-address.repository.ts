import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';
import { UserAddress } from '../entities/user-address.entity';
import { UserAddressRepositoryInterface } from './user-address.interface.repository';

@Injectable()
export class UserAddressRepository
  extends BaseAbstractRepository<UserAddress>
  implements UserAddressRepositoryInterface
{
  constructor(
    @InjectRepository(UserAddress)
    private readonly repository: Repository<UserAddress>,
  ) {
    super(repository);
  }
}
