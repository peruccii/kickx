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
          purchased: {
            select: {
              id: true,
              photo: true,
              name: true,
              code: true,
              purchasedById: true,
              description: true,
              size: true,
              price: true,
              Offer: true
            },
          },
          selled: true,
          TennisWon: {
            select: {
              Tennis: {
                select: {
                  id: true,
                  name: true,
                  photo: true,
                  price: true,
                  code: true
                }
              }
            }
          }
        },
      });

      

      res.json({ allUsers: allUsers })
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar os usuários' });
    }
  }
}