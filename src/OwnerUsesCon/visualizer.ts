import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class visualizer {
  async execute(req: Request, res: Response): Promise<void> {
    try {
      const visualizer = await prismaClient.owner.findFirst({
        orderBy: { id: 'desc' },
        include: {
          Tennis: {
            select: {
              id: true,
              name: true,
              photo: true,
              description: true,
              code: true,
              price: true,
              quantity: true
            },
          }
        },
      });

      const totalUsers = await prismaClient.user.count();


      res.json({ VisualizerOwner: { totalUsers, ...visualizer } });
    } catch (error) {
      console.log('Visualizer erro', error);
      res.status(500).json({ error: 'Ocorreu um erro ao visualizar' });
    }
  }
}
