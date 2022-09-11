import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { CustomersService } from './customers.service';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('/ping')
  pingCustomerService() {
    return this.customersService.pingCustomerService();
  }
}
