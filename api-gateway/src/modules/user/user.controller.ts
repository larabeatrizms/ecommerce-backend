import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ShowUserDto } from './dtos/show-user.dto';
import { UpdateUserDto } from './dtos/update-user-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/ping')
  @ApiOperation({ summary: 'Verifica se serviço está executando.' })
  pingUserService() {
    return this.userService.pingUserService();
  }

  @Post()
  @ApiOperation({ summary: 'Cria um usuário.' })
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Busca um usuário pelo ID.' })
  showUser(@Param() data: ShowUserDto) {
    return this.userService.showUser(data);
  }

  @Patch('/profile/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Editar perfil de um usuário.' })
  updateUserProfile(
    @Param() params: Pick<UpdateUserDto, 'id'>,
    @Body() body: Omit<UpdateUserDto, 'id'>,
  ) {
    return this.userService.updateUserProfile({
      ...params,
      ...body,
    });
  }
}
