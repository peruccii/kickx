import { Request, Response } from 'express';
import { GetAllSneakers } from '../../DAO/sneaker-dao/gets/GetAllSneakers';

export class GetAllSneakersController {
  async handle(req: Request, res: Response) {
    const getAllSneakers = new GetAllSneakers();
    await getAllSneakers.execute(req, res);
  }
}
