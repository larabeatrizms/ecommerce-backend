import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CustomersService } from './customers.service';

@Controller()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @MessagePattern({ role: 'customer', cmd: 'find-one' })
  findOne({ customerName }: { customerName: string }) {
    return this.customersService.findOne(customerName);
  }
}
