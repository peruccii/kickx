import { Request, Response } from "express";
import { boxesInterface } from "../../interfaces/sneakerInterfaces/boxesInterface";
import { CreateBoxes } from "../../DAO/sneaker-dao/creates/CreateBoxes";

export class CreateBoxesController {
    async handle(req: Request<{}, {}, Omit<boxesInterface, "id">>, res: Response) {
        try {
            const {name, photo, price} = req.body

            const createBoxes = new CreateBoxes()
            const rs = await createBoxes.execute({name, photo, price})

            return res.status(201).json(rs)
        } catch (err) {
            console.log("erro na controller", err);
            
        }
    }
}