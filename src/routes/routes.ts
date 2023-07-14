import { Request, Response, Router } from 'express';
import { UnknowRoute } from '../errors/AppError';
import { CreateSenakerController } from '../controllers/sneaker-controller/CreateSenakerController';
import { CreateUserController } from '../controllers/user-controller/CreateUserController';
import { CreateBrandController } from '../controllers/sneaker-controller/CreateBrandController';
import { MakeOfferController } from '../controllers/user-controller/MakeOfferController';
import { GetAllUsersController } from '../controllers/user-controller/gets/GetAllUsersController';
import { GetAllSneakersController } from '../controllers/sneaker-controller/GetAllSneakersController';
import { CreateProblemController } from '../controllers/user-controller/CreateProblemController';
import { createSneakerValidation } from '../controllers/sneaker-controller/CreateSenakerController';
import { createUserValidation } from '../controllers/user-controller/CreateUserController';
import { createBrandValidation } from '../controllers/sneaker-controller/CreateBrandController';
import { CreateBoxesController } from '../controllers/sneaker-controller/CreateBoxesController';
import { GetAllBoxesController } from '../controllers/sneaker-controller/GetAllBoxesController';

const Routes = Router()

const createSenakerController = new CreateSenakerController()
const createUserController = new CreateUserController()
const makeOfferController = new MakeOfferController()
const getAllUsersController = new GetAllUsersController()
const getAllSneakersController = new GetAllSneakersController()
const createBrandController = new CreateBrandController()
const createProblemController = new CreateProblemController()
const createBoxesController = new CreateBoxesController()
const getAllBoxesController = new GetAllBoxesController()

const nodemailer = require("nodemailer")
const stripe = require('stripe')('sk_test_51NFmiuB44rleyHUGDyWn2d7P48h5BMW19mZg0ujRGtqaR8Y6rs20B0wxqtMvBB0i96E6ocxJAO8ckFHuKQG7kaB000LooKGoZ0')

Routes.post('/sneaker/:userId', 
createSneakerValidation, 
createSenakerController.handle)

Routes.post('/user',
createUserValidation,
createUserController.handle)

Routes.post('/offer/:userId/:tennisId',
makeOfferController.handle)

Routes.post('/brand', 
createBrandValidation,
createBrandController.handle)

Routes.post('/box', 
createBoxesController.handle
)

Routes.post('/problem',
createProblemController.handle)

Routes.get('/users',
getAllUsersController.handle)

Routes.get("/sneaker", 
getAllSneakersController.handle)

Routes.get('/box',
getAllBoxesController.handle
)

Routes.use(function(req, res, next) {
  throw new UnknowRoute('Unknown route', 404);
});


export { Routes }