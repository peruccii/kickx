import { prismaClient } from '../../../database/prismaClient';
import { Request, Response } from 'express';

export class GetAllBoxes {
  async execute(req: Request, res: Response): Promise<void> {
    try {
      const boxes = await prismaClient.boxes.findMany({
        orderBy: {
          id: "desc",
        },
        include: {
          TennisBox: {
            select: {
              tennis: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  quantity: true
                },
              },
            },
          },
        },
      });

     
      const processedBoxes = boxes.map((box) => {
        const uniqueTennis: { [key: string]: any } = {}; 

        box.TennisBox.forEach((tennisObj) => {
          const { id, name, price, quantity } = tennisObj.tennis;
          if (!uniqueTennis[id]) {
            uniqueTennis[id] = { id, name, price, quantity };
          }
        });

        return {
          id: box.id,
          photo: box.photo,
          name: box.name,
          price: box.price,
          TennisBox: Object.values(uniqueTennis),
        };
      });

      res.json({ boxes: processedBoxes });
    } catch (error) {
      console.error('Erro ao buscar boxes:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar boxes' });
    }
  }
}
