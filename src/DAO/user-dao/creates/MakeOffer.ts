import { prismaClient } from '../../../database/prismaClient';
import { AppError } from '../../../errors/AppError';
import { Offer } from '@prisma/client';


export interface OfferInterface {
  price: number
}

export interface OfferInterfaceAccept {
  codeTennis: string
}

export class MakeOffer {
  async execute(tennisId: string, userId: string, { price }: OfferInterface): Promise<Offer> {

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

    if (userExists.money >= price) {
      const rs = await prismaClient.offer.create({
        data: {
          tennisId,
          userId,
          price,
        },
      })
      return rs
    } else {
      throw new AppError("To make an offer, you need money referring to your offer price", 400)
    }
  }

  async acceptOffer(offerId: string, sellerId: string, buyerId: string, { codeTennis }: OfferInterfaceAccept): Promise<void> {
    const offerExists = await prismaClient.offer.findUnique({
      where: {
        id: offerId
      }
    })
    if (!offerExists)
      throw new AppError("Offer not found", 404)

    const codeExists = await prismaClient.tennis.findUnique({
      where: {
        code: codeTennis
      }
    })
    if (!codeExists)
      throw new AppError("Code not found", 404)

    const buyer = await prismaClient.user.findFirst({
      where: {
        id: buyerId,
      },
    })

    if (!buyer || buyer.money < offerExists.price)
      throw new AppError("The buyer does't have the necessary money to purchase your tennis at this moment", 404)

    if (codeExists) {
      await prismaClient.$transaction([
        prismaClient.user.update({
          where: { id: buyerId },
          data: { money: { decrement: offerExists.price } }
        }),
        prismaClient.user.update({
          where: { id: sellerId },
          data: { money: { increment: offerExists.price } }
        }),
        prismaClient.user.update({
          where: { id: sellerId },
          data: {
            Offer: { disconnect: { id: offerId } },
            selled: { disconnect: { code: codeTennis } }
          }
        }),
        prismaClient.user.update({
          where: { id: buyerId },
          data: { purchased: { connect: { code: codeTennis } } }
        }),
        prismaClient.offer.delete({
          where: { id: offerId },
        }),
      ]);
    }
  }
  async declineOffer(offerId: string, userId: string): Promise<void> {
    const userExists = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    })
    
    const offerExists = await prismaClient.offer.findUnique({
      where: {
        id: offerId
      }
    })
    if (!offerExists)
      throw new AppError("Offer not found", 404)

    await prismaClient.offer.delete({
      where: { id: offerId },
    })
  }
}