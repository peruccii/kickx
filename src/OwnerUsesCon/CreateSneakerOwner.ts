// CreateSneakerOwner.ts
import { prismaClient } from '../database/prismaClient';
import { Tennis } from '@prisma/client';
import { sneakerInterface } from '../interfaces/sneakerInterfaces/sneakerInterface';
import { AppError } from '../errors/AppError';
import * as crypto from 'crypto';

export interface sneakerOwner{
  name: string,
  photo: string,
  description: string,
  fastSell: boolean,
  size: string,
  price: number
}

export class CreateSneakerOwner {
  async execute(ownerId: string, { name, photo, description, fastSell, size, price }: sneakerOwner): Promise<Tennis> {
    try {
      const generateCode = crypto.randomBytes(4).toString('hex');

      const sneakerAlreadyExist = await prismaClient.tennis.findUnique({
        where: {
          code: generateCode,
        },
      });

      if (sneakerAlreadyExist) {
        throw new AppError('Sneaker already exists', 400);
      }

      const tennis = await prismaClient.tennis.create({
        data: {
          name,
          photo,
          description,
          fastSell,
          size,
          price,
          code: generateCode,
          Owner: {
            connect: {
              id: ownerId,
            },
          },
        },
      });

      return tennis;
    } catch (error) {
      console.log('Error creating tennis', error);
      throw new AppError('An error occurred while creating the tennis', 500);
    }
  }
}
