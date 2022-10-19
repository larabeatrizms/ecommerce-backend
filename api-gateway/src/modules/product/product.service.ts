import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, timeout } from 'rxjs/operators';

export type Product = any;

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly productClient: ClientProxy,
  ) {}

  pingProductService() {
    const startTs = Date.now();
    return this.productClient
      .send<string>({ role: 'product', cmd: 'ping' }, {})
      .pipe(
        timeout(5000),
        map((message) => ({ message, duration: Date.now() - startTs })),
      );
  }
}
