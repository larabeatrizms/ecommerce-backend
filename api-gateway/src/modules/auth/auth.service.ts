import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.signIn({ email, password });

    if (user) {
      delete user.password;

      return user;
    }

    return null;
  }

  async login(user: UserInterface) {
    return {
      user_id: user.id,
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
    };
  }
}
