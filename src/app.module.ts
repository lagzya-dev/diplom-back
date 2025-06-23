import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule, AuthModule, CartsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
