import { prismaClient } from "../../../database/prismaClient";
import { AppError } from "../../../errors/AppError";
import { boxesInterface } from "../../../interfaces/sneakerInterfaces/boxesInterface";
import { Boxes } from "@prisma/client";

export class CreateBoxes {
    async execute({name, photo, price}: boxesInterface): Promise<Boxes> {

        const boxeAlreadyExists = await prismaClient.boxes.findUnique({
            where: {
                name
            }
        })

        if(boxeAlreadyExists){
            throw new AppError("box already exist", 400)
        }

        const box = await prismaClient.boxes.create({
            data: {
                name,
                price,
                photo
            }
        })

        return box

    }
}