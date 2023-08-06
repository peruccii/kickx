import { prismaClient } from '../../../database/prismaClient';
import { AppError } from '../../../errors/AppError';
import { Tennis } from '@prisma/client';

export class AddQuantity {
  async execute(tennisId: string, newQuantityValue: number): Promise<Tennis> {
    const tennisExists = await prismaClient.tennis.findFirst({
      where: {
        id: tennisId,
      },
    });

    if (!tennisExists) {
      throw new AppError('Tennis does not exist', 400);
    }

    const updatedTennis = await prismaClient.tennis.update({
      where: { id: tennisId },
      data: { quantity: { increment: newQuantityValue }  },
    });

    return updatedTennis;
  }
}
