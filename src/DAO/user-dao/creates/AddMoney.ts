import { prismaClient } from '../../../database/prismaClient';
import { AppError } from '../../../errors/AppError';
import { User } from '@prisma/client';

export class AddMoney {
  async execute(userId: string, newMoneyValue: number): Promise<User> {
    const userExists = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new AppError('User does not exist', 400);
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: { money: { increment: newMoneyValue }  },
    });

    return updatedUser;
  }
}
