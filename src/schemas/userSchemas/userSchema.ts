import * as yup from 'yup'
import { userInterface } from '../../interfaces/UserInterfaces/userInterface'

interface IBodyProps extends Omit<userInterface, 'id'>{ }

export const userBodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
  name: yup.string().required().min(4).max(40),
  photo: yup.string().url(),
  email: yup.string().required().email().min(3).max(100),
  password: yup.string().required().min(3).max(40),
  birthDate: yup.date().required(),
  cpf: yup.string().required(),
  createdAt: yup.date(),
})

