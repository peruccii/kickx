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
          endereco_usuario: true,
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
          selled: {
            select: {
              id: true,
              name: true,
              photo: true,
              description: true,
              size: true,
              price: true,
              code: true,
              used: true,
              purchasedById: true,
              sellerId: true,
              usedDuration: true,
              fastSell: true,
              Offer: true
            }
          },
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
          },
          Offer: true
        },
      });

      

      res.json({ allUsers: allUsers })
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar os usuários' });
    }
  }
}