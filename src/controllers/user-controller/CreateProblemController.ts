import { Request, Response, RequestHandler } from 'express'
import * as yup from 'yup'
import { CreateProblem } from '../../DAO/user-dao/creates/CreateProblem';
import { ProblemInterface } from '../../DAO/user-dao/creates/CreateProblem';
import { offerBodyValidation } from '../../schemas/offerSchema';


export class CreateProblemController {
  async handle(req: Request<{ userId: string}, {}, Omit<ProblemInterface, "id">>, res: Response) {
    try {
      const { userId } = req.params;

    const { name, describe }: ProblemInterface = req.body;

    const createProblem = new CreateProblem()

    const result = await createProblem.execute(userId,{ name, describe })
   
    
    return res.status(201).json(result)
    } catch (err) {
      console.log(err);
      
    }
    

  }
}