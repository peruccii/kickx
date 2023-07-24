import { PrismaClient, Prisma } from '@prisma/client'
import { AppError } from '../../../errors/AppError'

interface SneakerInBoxInterface {
  boxId: string
  tennisIds: string[]
}

const prisma = new PrismaClient()

export class SneakerInBox {
  async execute({ boxId, tennisIds }: SneakerInBoxInterface): Promise<void> {
    const boxExists = await prisma.boxes.findUnique({
      where: { id: boxId },
    })

    if (!boxExists) {
      throw new AppError('Box does not exist', 400)
    }

    const existingTennis = await prisma.tennis.findMany({
      where: { id: { in: tennisIds } },
    })

    const existingTennisIds = existingTennis.map((tennis) => tennis.id)
    const nonExistingTennisIds = tennisIds.filter(
      (tennisId) => !existingTennisIds.includes(tennisId)
    )

    if (nonExistingTennisIds.length > 0) {
      throw new AppError(
        `Tennis with IDs ${nonExistingTennisIds.join(', ')} do not exist`,
        400
      )
    }

    await prisma.$transaction(async (prisma) => {
      const createTennisBoxes = tennisIds.map((tennisId) =>
        prisma.tennisBox.create({
          data: {
            tennisId,
            boxId,
          },
        })
      )

     
      await Promise.all(createTennisBoxes)

      const tennisPrices = existingTennis.map((tennis) => tennis.price)
      const totalPrices = tennisPrices.reduce((acc, price) => acc + price, 0)
      const probabilities = tennisPrices.map((price) => 1 / (price * 0.1))
      const totalProbability = probabilities.reduce((acc, probability) => acc + probability, 0)
      const chances = probabilities.map((probability) => probability / totalProbability)
      const finalPrice = totalPrices / totalProbability;


      
      const updatedBox = await prisma.boxes.update({
        where: {
          id: boxId,
        },
        data: {
          price: finalPrice, 
        },
      })
      console.log(finalPrice);
      
      console.log('Chances dos tênis:', chances)
    })
  }
}
