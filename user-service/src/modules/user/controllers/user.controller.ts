import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SignInInterface } from '../dtos/sign-in.interface';
import { CreateUserInterface } from '../dtos/create-user.interface';
import { CreateUserService } from '../services/create-user.service';
import { SignInService } from '../services/sign-in.service';

@Controller()
export class UserController {
  constructor(
    private readonly signInService: SignInService,
    private readonly createUserService: CreateUserService,
  ) {}

  @MessagePattern({ role: 'user', cmd: 'sign-in' })
  signIn({ email, password }: SignInInterface) {
    return this.signInService.signIn({
      email,
      password,
    });
  }

  @MessagePattern({ role: 'user', cmd: 'create-user' })
  createUser(user: CreateUserInterface) {
    return this.createUserService.createUser(user);
  }
}
