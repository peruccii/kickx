import { prismaClient } from '../../../database/prismaClient';
import { AppError } from '../../../errors/AppError';
import { Problem } from '@prisma/client';

export interface ProblemInterface {
  name: string
  describe: string
}

export class CreateProblem {
  async execute(userId: string,{ name, describe }: ProblemInterface): Promise<Problem> {

      const userExists = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (!userExists) {
      throw new AppError("user not exist", 400)
    }

    const rs = await prismaClient.problem.create({
      data: {
       name,
       describe,
       userId  
      }
    })
    return rs
  }
}