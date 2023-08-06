import { Request, Response } from 'express';
import { BuySneaker } from '../../DAO/user-dao/creates/BuySneaker';
import { AppError } from '../../errors/AppError';

export class BuySneakerController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { buyerId, tennisId, sellerId } = req.params;

    try {
      if (!buyerId || !tennisId || !sellerId) {
        throw new AppError('Missing buyerId or tennisId', 400);
      }

      const buySneakerService = new BuySneaker();
      await buySneakerService.execute(buyerId, tennisId, sellerId);

      return res.status(200).json({ message: 'Sneaker purchased successfully!' });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      console.error('An unexpected error occurred:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
