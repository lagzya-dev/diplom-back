import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { OrdersController } from '../orders/orders.controller';
import { OrdersService } from '../orders/orders.service';

@Module({
  controllers: [CartsController, OrdersController],
  providers: [OrdersService, CartsService, PrismaService],
})
export class CartsModule {}
