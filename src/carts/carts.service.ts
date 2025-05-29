import { Injectable } from '@nestjs/common';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateCart(userId: number) {
    return this.prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
      include: { items: { include: { product: true } } },
    });
  }

  async addToCart(userId: number, productId: number, quantity: number) {
    const cart = await this.getOrCreateCart(userId);

    return this.prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      create: { cartId: cart.id, productId, quantity },
      update: { quantity: { increment: quantity } },
    });
  }

  async removeFromCart(userId: number, productId: number) {
    const cart = await this.getOrCreateCart(userId);

    return this.prisma.cartItem.delete({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });
  }
}
