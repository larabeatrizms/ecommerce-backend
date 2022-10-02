import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SignInInterface } from '../dtos/sign-in.interface';
import { CreateUserInterface } from '../dtos/create-user.interface';
import { CreateUserService } from '../services/create-user.service';
import { SignInService } from '../services/sign-in.service';
import { ShowUserService } from '../services/show-user.service';
import { IShowUser } from '../dtos/show-user.interface';
import { IUpdateUserProfile } from '../dtos/update-user-profile.interface';
import { UpdateUserProfileService } from '../services/update-user-profile.service';
import { IUpdateUserAddress } from '../dtos/update-user-address.interface';
import { UpdateUserAddressService } from '../services/update-user-address.service';

@Controller()
export class UserController {
  constructor(
    private readonly signInService: SignInService,
    private readonly createUserService: CreateUserService,
    private readonly showUserService: ShowUserService,
    private readonly updateUserProfileService: UpdateUserProfileService,
    private readonly updateUserAddressService: UpdateUserAddressService,
  ) {}

  @MessagePattern({ role: 'user', cmd: 'sign-in' })
  signIn({ email, password }: SignInInterface) {
    return this.signInService.execute({
      email,
      password,
    });
  }

  @MessagePattern({ role: 'user', cmd: 'create-user' })
  createUser(data: CreateUserInterface) {
    return this.createUserService.execute(data);
  }

  @MessagePattern({ role: 'user', cmd: 'show-user' })
  showUser(data: IShowUser) {
    return this.showUserService.execute(data);
  }

  @MessagePattern({ role: 'user', cmd: 'update-user-profile' })
  updateUserProfile(data: IUpdateUserProfile) {
    return this.updateUserProfileService.execute(data);
  }

  @MessagePattern({ role: 'user', cmd: 'update-user-address' })
  updateUserAddress(data: IUpdateUserAddress) {
    return this.updateUserAddressService.execute(data);
  }
}
