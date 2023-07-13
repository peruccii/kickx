import { User } from '@prisma/client';
import { userInterface } from '../../../interfaces/UserInterfaces/userInterface';
import { prismaClient } from '../../../database/prismaClient';
import { AppError } from '../../../errors/AppError';
import { DateTime } from 'luxon';
import bcrypt from "bcrypt"

export class CreateUser {
   async execute({ email, password, photo, name, birthDate, cpf }: userInterface): Promise<User> {

      const userAlreadyExist = await prismaClient.user.findUnique({
         where: {
            email
         },
      })
      if (userAlreadyExist) {
         throw new AppError("user already exist", 400)
      }

      const hashPassword = await bcrypt.hash(password, 10)
      const birthDateE = DateTime.fromISO(String(birthDate)).toJSDate(); 

      const user = await prismaClient.user.create({
         data: {
            name,
            photo,
            password: hashPassword,
            birthDate: birthDateE,
            cpf,
            email,
            
         }
      })

      return user
   }
}