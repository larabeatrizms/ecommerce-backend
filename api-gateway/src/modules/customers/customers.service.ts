import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { map, timeout } from 'rxjs/operators';

export type Customer = any;

@Injectable()
export class CustomersService {
  constructor(
    @Inject('CUSTOMER_SERVICE')
    private readonly customersClient: ClientProxy,
  ) {}

  pingCustomerService() {
    const startTs = Date.now();
    return this.customersClient
      .send<string>({ role: 'customer', cmd: 'ping' }, {})
      .pipe(
        timeout(5000),
        map((message) => ({ message, duration: Date.now() - startTs })),
      );
  }

  async findOne(customerName: string): Promise<Customer | undefined> {
    const source$ = this.customersClient
      .send<string>({ role: 'customer', cmd: 'find-one' }, { customerName })
      .pipe(timeout(2000));

    const result = await lastValueFrom(source$, {
      defaultValue: 'Usuário não encontrado',
    });

    return result;
  }
}
