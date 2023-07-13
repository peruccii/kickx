import * as yup from 'yup'
import { OfferInterface } from '../DAO/user-dao/creates/MakeOffer'

interface IBodyProps extends Omit<OfferInterface, 'id'>{ }

export const offerBodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
  price: yup.number().required(),
  userId: yup.string().required(),
  tennisId: yup.string().required()
})

