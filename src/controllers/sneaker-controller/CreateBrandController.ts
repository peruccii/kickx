import { Request, Response, RequestHandler } from 'express'
import { CreateBrand } from '../../DAO/sneaker-dao/creates/CreateBrand'
import { brandInterface } from '../../interfaces/sneakerInterfaces/brandInterface'
import { brandBodyValidation } from '../../schemas/snkearSchemas/brandSchema'
import * as yup from 'yup'

export const createBrandValidation: RequestHandler = async (req, res, next) => {
  try {
    await brandBodyValidation.validate(req.body, { abortEarly: false })
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

export class CreateBrandController {
  async handle(req: Request<{}, {}, Omit<brandInterface, "id">>, res: Response) {
    const { name, photo } = req.body

    const createBrand = new CreateBrand()

    const result = await createBrand.execute({name, photo})

    return res.status(201).json(result)
  }
}