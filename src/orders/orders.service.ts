import { BadRequestException, Injectable } from '@nestjs/common';
import { CartsService } from '../carts/carts.service';
import { Order } from '../../generated/prisma';

@Injectable()
export class OrdersService {
  constructor(private cartsService: CartsService) {}

  async getOrders(userId: number): Promise<Order[]> {
    return this.cartsService.prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
  async createOrder(userId: number, address: string, phone: string) {
    const cart = await this.cartsService.getOrCreateCart(userId);
    const items = cart.items;

    if (items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const order = await this.cartsService.prisma.order.create({
      data: {
        userId,
        total,
        address,
        phone,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    // Очищаем корзину
    await this.cartsService.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return order;
  }
}
