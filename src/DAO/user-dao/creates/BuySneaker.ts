import { prismaClient } from '../../../database/prismaClient';
import { AppError } from '../../../errors/AppError';

export class BuySneaker {
  async execute(buyerId: string, tennisId: string, sellerId: string): Promise<void> {
    const buyer = await prismaClient.user.findUnique({
      where: {
        id: buyerId,
      },
    });

    if (!buyer) {
      throw new AppError('Buyer does not exist', 400);
    }

    const tennisU = await prismaClient.tennis.findUnique({
      where: {
        id: tennisId,
      },
      include: {
        seller: true,
      },
    });

    if (!tennisU) {
      throw new AppError('Tennis does not exist', 400);
    }

    if (buyer.money < tennisU.price) {
      throw new AppError('Saldo insuficiente', 400);
    }

    await prismaClient.tennis.update({
      where: { id: tennisId },
      data: {
        purchasedById: buyerId,
        sellerId: null, 
      },
    });

    await prismaClient.user.update({
      where: { id: buyerId },
      data: {
        money: buyer.money - tennisU.price,
        purchased: {
          connect: {
            id: tennisId,
          },
        },
      },
    });

    await prismaClient.user.update({
      where: { id: sellerId },
      data: {
        selled: {
          disconnect: {
            id: tennisId,
          },
        },
      },
    });
  }
}
