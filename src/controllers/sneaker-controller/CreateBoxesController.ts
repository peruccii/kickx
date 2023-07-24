import { Request, Response } from 'express';
import { CreateBoxes } from '../../DAO/sneaker-dao/creates/CreateBoxes';

export class BoxesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, photo, price } = request.body;

    const createBoxes = new CreateBoxes();
    const box = await createBoxes.execute({ name, photo, price });

    return response.json(box);
  }

  async addTennisToBox(request: Request, response: Response): Promise<Response> {
    const { boxId, tennisIds } = request.body;

    const createBoxes = new CreateBoxes();
    await createBoxes.addTennisToBox(boxId, tennisIds);

    return response.sendStatus(200);
  }

  async openBox(request: Request, response: Response): Promise<Response> {
    try {
      const { boxId, userId } = request.params;
      
      const createBoxes = new CreateBoxes();
      const chosenTennis = await createBoxes.openBox(boxId, userId);
      
      return response.status(200).json(chosenTennis);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  }
}
