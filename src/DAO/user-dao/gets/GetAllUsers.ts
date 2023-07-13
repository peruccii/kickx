import { Response } from 'express';
import { prismaClient } from '../../../database/prismaClient';


export class GetAllUsers {
  async execute(res: Response): Promise<void> {
    try {
      const allUsers = await prismaClient.user.findMany({
        orderBy: {
          id: 'desc',
        },
        include: {
          Tennis: {
            select: {
              id: true,
              photo: true,
              name: true,
              price: true,
              code: true,
              description: true,
              purchasedById: true,
              size: true,
              sellerId: true,
              Offer: {
                select: {
                  id: true,
                  price: true,
                  tennisId: true,
                  userId: true,
                }
              }
            }
          },
        }
      });

      res.json({ allUsers: allUsers })
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar os usuários' });
    }
  }
}