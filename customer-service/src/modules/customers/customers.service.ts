import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

export type Customer = any;

@Injectable()
export class CustomersService {
  private readonly customers: Customer[];

  constructor() {
    this.customers = [
      {
        customerId: 1,
        customerName: 'julia',
        password: 'changeme',
      },
      {
        customerId: 2,
        customerName: 'john',
        password: 'secret',
      },
    ];
  }

  async findOne(customerName: string): Promise<Customer | undefined> {
    const customer = this.customers.find(
      (customer) => customer.customerName === customerName,
    );

    if (!customer) {
      return new UnauthorizedException();
    }

    return customer;
  }
}
