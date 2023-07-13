import { prismaClient } from '../../../database/prismaClient';
import { AppError } from '../../../errors/AppError';
import { Offer } from '@prisma/client';


export interface OfferInterface {
  price: number
}

export class MakeOffer {
  async execute(tennisId: string, userId: string,{ price }: OfferInterface): Promise<Offer> {

      const userExists = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (!userExists) {
      throw new AppError("user not exist", 400)
    }

    const sneakerExists = await prismaClient.tennis.findFirst({
      where: {
        id: tennisId,
      },
    })

    if (!sneakerExists) {
      throw new AppError("sneaker not exist", 400)
    }

    const rs = await prismaClient.offer.create({
      data: {
        tennisId,
        userId,
        price,
        
      }
    })
 
  
    return rs
    
    

  }
}