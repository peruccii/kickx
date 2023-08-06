import { Request, Response, RequestHandler } from 'express'
import * as yup from 'yup'
import { MakeOffer } from '../../DAO/user-dao/creates/MakeOffer';
import { OfferInterface, OfferInterfaceAccept } from '../../DAO/user-dao/creates/MakeOffer';
import { offerBodyValidation } from '../../schemas/offerSchema';
import { prismaClient } from '../../database/prismaClient';
import { AppError } from '../../errors/AppError';

export class MakeOfferController {
  async handle(req: Request<{ userId: string, tennisId: string }, {}, Omit<OfferInterface, "id">>, res: Response) {
    try {
      const { userId } = req.params;
      const { tennisId } = req.params;

      const { price }: OfferInterface = req.body;

      const makeOffer = new MakeOffer()

      const result = await makeOffer.execute(tennisId, userId, { price })

      return res.status(201).json(result)
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
  async acceptOffer(req: Request<{ offerId: string, sellerId: string, buyerId: string }, {}, { codeTennis: string }>, res: Response) {
    try {
      const { offerId, sellerId, buyerId } = req.params;
      const { codeTennis } = req.body;

      const acceptOffer = new MakeOffer();
      await acceptOffer.acceptOffer(offerId, sellerId, buyerId, { codeTennis });

      return res.status(200).json({ message: "Offer accepted, your sneaker has been sold" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err });
    }
  }
  async declineOffer(req: Request<{ offerId: string, userId: string}, {}, Omit<OfferInterface, "id">>, res: Response) {
    try {
      const { offerId, userId } = req.params;
    
      const declineOffer = new MakeOffer();
      await declineOffer.declineOffer(offerId, userId);
      
      
      return res.status(200).json({ message: "Offer declined" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error declining offer: " + err });
    }
  }
}