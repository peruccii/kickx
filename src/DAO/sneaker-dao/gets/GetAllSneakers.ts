import { Tennis } from '@prisma/client';
import { prismaClient } from '../../../database/prismaClient';
import { Request, Response } from 'express';

export class GetAllSneakers {
  async execute(req: Request, res: Response): Promise<void> {
    try {
    const sneakers = await prismaClient.tennis.findMany({
      orderBy: {
       id : "desc",
      }
    })

    res.json({ sneakers: sneakers }) 
  } catch (error){
    console.error('Erro ao buscar sneakers:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar sneakers' });
  }
  }
}