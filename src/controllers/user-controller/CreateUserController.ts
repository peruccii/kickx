import { Request, RequestHandler, Response } from 'express'
import { CreateUser } from '../../DAO/user-dao/creates/CreateUser'
import { userInterface } from '../../interfaces/UserInterfaces/userInterface'
import { userBodyValidation } from '../../schemas/userSchemas/userSchema'
import * as yup from 'yup'

export const createUserValidation: RequestHandler = async (req, res, next) => {
  try {
    await userBodyValidation.validate(req.body, { abortEarly: false })
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

export class CreateUserController {
  async handle(req: Request<{}, {}, Omit<userInterface, "id">>, res: Response) {
    const { name, email, password, birthDate, cpf, photo } = req.body

    const createUser = new CreateUser()

    const result = await createUser.execute({ name, email, password, birthDate, cpf, photo})

    return res.status(201).json(result)
  }
}