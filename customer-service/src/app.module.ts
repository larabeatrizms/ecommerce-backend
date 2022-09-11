import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [ConfigModule.forRoot(), CustomersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
