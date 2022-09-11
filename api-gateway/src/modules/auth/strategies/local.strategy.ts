import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const customer = await this.authService.validateCustomer(
      username,
      password,
    );

    if (!customer) {
      throw new UnauthorizedException('Usuário não encontrado!');
    }

    return customer;
  }
}
