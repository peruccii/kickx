import { Tennis } from '@prisma/client';
import { sneakerInterface } from '../../../interfaces/sneakerInterfaces/sneakerInterface';
import { prismaClient } from '../../../database/prismaClient';
import { AppError } from '../../../errors/AppError';
import * as crypto from 'crypto'

export class CreateSneaker {
   async execute(userId: string, { photo, name, description, used, usedDuration, fastSell, size, price }: sneakerInterface): Promise<Tennis> {
      
      const generateCode = crypto.randomBytes(4).toString('hex')

      const sneakerAlreadyExist = await prismaClient.tennis.findUnique({
         where: {
            code: generateCode
         },
      })
      if (sneakerAlreadyExist) {
         throw new AppError("sneaker already exist", 400)
      }

      const sneaker = await prismaClient.tennis.create({
         data: {
            name,
            photo,
            description,
            used,
            usedDuration,
            fastSell,
            size,
            price,
            code: generateCode,
            seller: {
               connect: {
                  id: userId
               }
            }
         }
      })

      return sneaker
   }
}