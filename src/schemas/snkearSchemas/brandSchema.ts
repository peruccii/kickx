import * as yup from 'yup'
import { brandInterface } from '../../interfaces/sneakerInterfaces/brandInterface'

interface IBodyProps extends Omit<brandInterface, 'id'>{ }

export const brandBodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
  name: yup.string().required().min(4).max(40),
  photo: yup.string().url().required(),
})

