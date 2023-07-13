import { Request, Response, RequestHandler } from 'express'
import * as yup from 'yup'
import { MakeOffer } from '../../DAO/user-dao/creates/MakeOffer';
import { OfferInterface } from '../../DAO/user-dao/creates/MakeOffer';
import { offerBodyValidation } from '../../schemas/offerSchema';


export class MakeOfferController {
  async handle(req: Request<{ userId: string, tennisId: string }, {}, Omit<OfferInterface, "id">>, res: Response) {
    try {
      const { userId } = req.params;
    const { tennisId } = req.params;

    const { price }: OfferInterface = req.body;

    const makeOffer = new MakeOffer()

    const result = await makeOffer.execute(tennisId, userId,{ price })
   
    
    return res.status(201).json(result)
    } catch (err) {
      console.log(err);
      
    }
    

  }
}