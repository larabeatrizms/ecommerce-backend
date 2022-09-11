import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Customer')
  @Get('/ping-customer-service')
  pingCustomerService() {
    return this.appService.pingCustomerService();
  }
}
