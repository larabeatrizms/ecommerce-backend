import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SignInInterface } from './interfaces/signin.interface';
import { UserInterface } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'sign-in' })
  signIn({ email, password }: SignInInterface) {
    console.log('signIn');
    return this.userService.signIn({
      email,
      password,
    });
  }

  @MessagePattern({ role: 'user', cmd: 'create-user' })
  createUser(user: UserInterface) {
    console.log('createUser');
    return this.userService.createUser(user);
  }
}
