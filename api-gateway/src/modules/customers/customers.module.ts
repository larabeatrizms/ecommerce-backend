import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomerController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CUSTOMER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8888,
        },
      },
    ]),
  ],
  providers: [CustomersService],
  controllers: [CustomerController],
  exports: [CustomersService],
})
export class CustomersModule {}
