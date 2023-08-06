import { Request, Response } from 'express';
import { AddQuantity } from '../../DAO/user-dao/creates/AddQuantity';

export class AddQuantityController {
  async updateQuantity(req: Request, res: Response) {
    try {
      const { tennisId } = req.params;
      const { quantity } = req.body;

      const updateTennisQuantity = new AddQuantity();
      const newQuantityValue = parseFloat(quantity); // Converte o valor para o tipo correto
      const updatedTennis = await updateTennisQuantity.execute(tennisId, newQuantityValue);

      return res.json(updatedTennis);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}


