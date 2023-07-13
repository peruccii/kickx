import { Brand } from '@prisma/client';
import { brandInterface } from '../../../interfaces/sneakerInterfaces/brandInterface';
import { prismaClient } from '../../../database/prismaClient';
import { AppError } from '../../../errors/AppError';

export class CreateBrand {
   async execute({ photo, name}: brandInterface): Promise<Brand> {
      
      const brandAlreadyExist = await prismaClient.brand.findUnique({
         where: {
            name
         },
      })
      if (brandAlreadyExist) {
         throw new AppError("sneaker already exist", 400)
      }

      const brands = await prismaClient.brand.create({
         data: {
            name,
            photo,
         }
      })

      return brands
   }
}