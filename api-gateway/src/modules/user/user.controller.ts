import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';

@ApiTags('User')
@Controller('customer')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/ping')
  pingUserService() {
    return this.userService.pingUserService();
  }
}
