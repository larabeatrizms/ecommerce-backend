import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ShowUserDto } from './dtos/show-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/ping')
  pingUserService() {
    return this.userService.pingUserService();
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get('/:id')
  showUser(@Param() data: ShowUserDto) {
    return this.userService.showUser(data);
  }
}
