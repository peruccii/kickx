import { Request, Response } from 'express'
import { GetAllUsers } from '../../../DAO/user-dao/gets/GetAllUsers'

export class GetAllUsersController {
  async handle(req: Request, res: Response) {

    const getAllUsers = new GetAllUsers()
     await getAllUsers.execute(res)
  }
}