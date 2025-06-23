import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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

    await this.prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId: productId } },
      create: { cartId: cart.id, productId: productId, quantity: quantity },
      update: { quantity: { increment: quantity } },
    });

    return this.getOrCreateCart(userId);
  }

  async removeFromCart(userId: number, productId: number) {
    const cart = await this.getOrCreateCart(userId);
    await this.prisma.cartItem.delete({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });
    return this.getOrCreateCart(userId);
  }

  async clearCart(userId: number) {
    await this.prisma.cart.delete({
      where: {
        userId: userId,
      },
    });
    return this.getOrCreateCart(userId);
  }

  async updateCart(userId: number, productId: number, quantity: number) {
    const getUserCart = await this.getOrCreateCart(userId);
    await this.prisma.cart.update({
      where: {
        userId,
      },
      data: {
        items: {
          update: {
            where: {
              cartId_productId: {
                cartId: getUserCart.id,
                productId: productId,
              },
            },
            data: {
              quantity: {
                increment: quantity,
              },
            },
          },
        },
      },
    });
    return this.getOrCreateCart(userId);
  }
}
