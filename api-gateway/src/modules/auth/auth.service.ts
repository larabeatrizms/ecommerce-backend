import { Injectable } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly customersService: CustomersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateCustomer(username: string, pass: string): Promise<any> {
    const customer = await this.customersService.findOne(username);

    if (customer && customer.password === pass) {
      delete customer.password;

      return customer;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
