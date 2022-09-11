import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { UserInterface } from './interfaces/user.interface';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/ping')
  pingUserService() {
    return this.userService.pingUserService();
  }

  @Post()
  createUser(@Body() user: UserInterface) {
    return this.userService.createUser(user);
  }
}
