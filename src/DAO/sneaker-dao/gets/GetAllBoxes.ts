
import { prismaClient } from '../../../database/prismaClient';
import { Request, Response } from 'express';

export class GetAllBoxes {
  async execute(req: Request, res: Response): Promise<void> {
    try {
    const boxes = await prismaClient.boxes.findMany({
      orderBy: {
       id : "desc",
      }
    })

    res.json({ boxes: boxes }) 
  } catch (error){
    console.error('Erro ao buscar boxes:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar boxes' });
  }
  }
}