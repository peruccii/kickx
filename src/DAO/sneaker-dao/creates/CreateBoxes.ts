import { PrismaClient } from '@prisma/client';
import { AppError } from '../../../errors/AppError';
import { boxesInterface } from '../../../interfaces/sneakerInterfaces/boxesInterface';
import { Boxes, Tennis } from '@prisma/client';

const prisma = new PrismaClient();

export class CreateBoxes {
  async execute({ name, photo, price }: boxesInterface): Promise<Boxes> {
    const boxAlreadyExists = await prisma.boxes.findUnique({
      where: {
        name,
      },
    });

    if (boxAlreadyExists) {
      throw new AppError('Box already exists', 400);
    }

    const box = await prisma.boxes.create({
      data: {
        name,
        photo,
        price: 0,
      },
    });

    return box;
  }

  async addTennisToBox(boxId: string, tennisIds: string[]): Promise<void> {
    const MIN_TENNIS_COUNT = 13;

    if (tennisIds.length < MIN_TENNIS_COUNT) {
      throw new AppError(`You need to select at least ${MIN_TENNIS_COUNT} tennis or more`, 400);
    }
    const boxExists = await prisma.boxes.findUnique({
      where: { id: boxId },
    });

    if (!boxExists) {
      throw new AppError('Box does not exist', 400);
    }

    const existingTennis = await prisma.tennis.findMany({
      where: { id: { in: tennisIds } },
    });

    const existingTennisIds = existingTennis.map((tennis) => tennis.id);
    const nonExistingTennisIds = tennisIds.filter(
      (tennisId) => !existingTennisIds.includes(tennisId)
    );

    if (nonExistingTennisIds.length > 0) {
      throw new AppError(
        `Tennis with IDs ${nonExistingTennisIds.join(', ')} do not exist`,
        400
      );
    }

    const createTennisBoxes = tennisIds.map((tennisId) =>
      prisma.tennisBox.create({
        data: {
          tennisId,
          boxId,
        },
      })
    );

    await Promise.all(createTennisBoxes);
  }

  async openBox(boxId: string, userId: string): Promise<Tennis> {
    const box = await prisma.boxes.findUnique({
      where: { id: boxId },
      include: {
        TennisBox: {
          include: {
            tennis: true,
          },
        },
      },
    });

    if (!box) {
      throw new AppError('Box does not exist', 400);
    }

    const userP = await prisma.user.findUnique({
      where: {
        id: userId,
      },

    });

    if (!userP || box.price > userP.money) {
      throw new AppError('o usuario nao tem saldo suficiente para abrir a caixa', 400);
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        money: {
          decrement: box.price
        }
      }
    })

    const tennisIds = box.TennisBox.map((tennisBox) => tennisBox.tennis.id);
    const existingTennis = await prisma.tennis.findMany({
      where: { id: { in: tennisIds } },
    });

    const tennisPrices = existingTennis.map((tennis) => tennis.price);
    const totalPrices = tennisPrices.reduce((acc, price) => acc + price, 0);
    const probabilities = tennisPrices.map((price) => 1 / (price * 0.1));
    const totalProbability = probabilities.reduce((acc, probability) => acc + probability, 0);
    const chances = probabilities.map((probability) => probability / totalProbability);

    const random = Math.random();
    let cumulativeProbability = 0;
    let chosenIndex = -1;

    for (let i = 0; i < chances.length; i++) {
      cumulativeProbability += chances[i];
      if (random <= cumulativeProbability) {
        chosenIndex = i;
        break;
      }
    }

    if (chosenIndex === -1) {
      throw new AppError('Failed to choose a tennis from the box', 500);
    }

    const chosenTennis = existingTennis[chosenIndex];
    console.log('Congratulations! You won a tennis:', chosenTennis);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        money: {
          increment: chosenTennis.price
        }
      }
    })

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User does not exist', 400);
    }

    await prisma.tennisWon.create({
      data: {
        userId,
        tennisId: chosenTennis.id,
      },
    });

   

    await prisma.owner.update({
      where: { id: process.env.idOwner },
      data: {
        Tennis: {
          disconnect: {
            id: chosenTennis.id
          }
        }
      }
    })

   

    if (chosenTennis.price > box.price) {
      await prisma.owner.update({
        where: { id: process.env.idOwner },
        data: {
          balance: { decrement: chosenTennis.price - box.price}
        }
      })
    } else {
      await prisma.owner.update({
        where: { id: process.env.idOwner },
        data: {
          balance: { increment:  Math.abs(chosenTennis.price - box.price)}
        }
      })
    }

    return chosenTennis;
  }

  async addTennisToBoxAndUpdatePrice(boxId: string, tennisIds: string[]): Promise<Boxes> {
    await this.addTennisToBox(boxId, tennisIds);


    const tennisPrices = await prisma.tennis.findMany({
      where: {
        TennisBox: {
          some: {
            boxId,
          },
        },
      },
      select: {
        price: true,
      },
    });

    console.log(tennisPrices);


    const totalPrices = tennisPrices.reduce((acc, tennis) => acc + tennis.price, 0);
    const percentages = tennisPrices.map((tennis) => tennis.price / totalPrices);
    const calculatedPrice = tennisPrices.reduce((acc, tennis, index) => acc + tennis.price * percentages[index], 0);
    const totalPercentage = percentages.reduce((acc, percentage) => acc + percentage, 0);
    const finalPrice = calculatedPrice / totalPercentage;

    const updatedBox = await prisma.boxes.update({
      where: {
        id: boxId,
      },
      data: {
        price: finalPrice,
      },
    });


    console.log(calculatedPrice);
    console.log(totalPercentage);

    return updatedBox;
  }
}
