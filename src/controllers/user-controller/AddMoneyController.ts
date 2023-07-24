import { Request, Response } from 'express';
import { AddMoney } from '../../DAO/user-dao/creates/AddMoney';

export class AddMoneyController {
  async updateMoney(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { value } = req.body;

      const updateUserMoney = new AddMoney();
      const newMoneyValue = parseFloat(value); // Converte o valor para o tipo correto
      const updatedUser = await updateUserMoney.execute(userId, newMoneyValue);

      return res.json(updatedUser);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}


