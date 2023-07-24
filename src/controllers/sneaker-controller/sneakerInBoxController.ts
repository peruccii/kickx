import { Request, Response } from 'express';
import { SneakerInBox } from '../../DAO/sneaker-dao/creates/sneakerInBox';

export class SneakerinBoxController {
  async handle(request: Request, response: Response) {
    const { boxId, tennisIds } = request.body;

    const sneakerInBox = new SneakerInBox();

    try {
      await sneakerInBox.execute({ boxId, tennisIds });
      return response.status(200).json({ message: 'Tennis added to box successfully' });
    } catch (error) {
      return response.status(6500).json({ error: error });
    }
  }
}

export default new SneakerinBoxController();
