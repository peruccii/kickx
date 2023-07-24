import { Request, Response, RequestHandler } from 'express'
import { CreateSneakerOwner } from './CreateSneakerOwner'
import { sneakerOwner } from './CreateSneakerOwner'
import * as yup from 'yup'
import { AppError } from '../errors/AppError'



export class CreateSenakerOwnerController {
  async handle(req: Request<{ ownerId: string}, {}, Omit<sneakerOwner, 'id'>>, res: Response) {
    try {
      const { ownerId } = req.params;
      const { name, photo, description, fastSell, size, price } = req.body;

      const createSneaker = new CreateSneakerOwner();

      const result = await createSneaker.execute(ownerId,{ name, photo, description, fastSell, size, price });

      return res.status(201).json(result);
    } catch (err) {
      console.log('Erro ao criar sneaker owner', err);

      if (err instanceof AppError) {
        return res.status(500).json({ error: err });
      }
      return res.status(500).json({ error: 'Ocorreu um erro ao criar o tênis' });
    }
  }
}