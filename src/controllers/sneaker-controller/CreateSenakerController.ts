import { Request, Response, RequestHandler } from 'express'
import { CreateSneaker } from '../../DAO/sneaker-dao/creates/CreateSneaker'
import { sneakerInterface } from '../../interfaces/sneakerInterfaces/sneakerInterface'
import { sneakerBodyValidation } from '../../schemas/snkearSchemas/sneakerSchema'
import * as yup from 'yup'

export const createSneakerValidation: RequestHandler = async (req, res, next) => {
  try {
    await sneakerBodyValidation.validate(req.body, { abortEarly: false })
    return next()
  } catch (err) {
    const yupError = err as yup.ValidationError
    const errors: Record<string, string> = {}

    yupError.inner.forEach(error => {
      if (error.path === undefined) return
      errors[error.path] = error.message
    })

    return res.status(400).json({
      errors
    })
  }
}

export class CreateSenakerController {
  async handle(req: Request<{userId: string}, {}, Omit<sneakerInterface, "id">>, res: Response) {
    const { userId } = req.params;
    const { name, photo, description, fastSell, used, size, price } = req.body

    const createSneaker = new CreateSneaker()

    const result = await createSneaker.execute(userId, {name, photo, description, fastSell, used, size, price})

    return res.status(201).json(result)
  }
}