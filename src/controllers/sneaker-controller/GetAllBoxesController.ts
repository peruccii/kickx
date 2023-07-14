import { Request, Response } from "express";
import { GetAllBoxes } from "../../DAO/sneaker-dao/gets/GetAllBoxes";

export class GetAllBoxesController {
    async handle(req: Request, res: Response) {
        const getAllBoxes = new GetAllBoxes()
        await getAllBoxes.execute(req, res)
    }
}