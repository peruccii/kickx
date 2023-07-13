import * as yup from 'yup'
import { sneakerInterface } from '../../interfaces/sneakerInterfaces/sneakerInterface'

interface IBodyProps extends Omit<sneakerInterface, 'id'>{ }

export const sneakerBodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
  name: yup.string().required().min(4).max(40),
  photo: yup.string().url().required(),
  description: yup.string().required().min(3).max(800),
  used: yup.boolean().required(),
  usedDuration: yup.string(),
  fastSell: yup.boolean().required(),
  size: yup.string().required(),
  price: yup.number().required()
})

