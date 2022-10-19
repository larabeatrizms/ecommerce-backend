import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('/ping')
  @ApiOperation({ summary: 'Verifica se serviço está executando.' })
  pingUserService() {
    return this.service.pingProductService();
  }
}
