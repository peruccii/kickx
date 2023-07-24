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
import { BoxesController } from '../controllers/sneaker-controller/CreateBoxesController';
import { GetAllBoxesController } from '../controllers/sneaker-controller/GetAllBoxesController';
import { SneakerinBoxController } from '../controllers/sneaker-controller/sneakerInBoxController';
import { AddMoneyController } from '../controllers/user-controller/AddMoneyController';
import { visualizerController } from '../OwnerUsesCon/VisualizerController';
import { CreateSenakerOwnerController } from '../OwnerUsesCon/CreateSenakerOwnerController';
import { BuySneakerController } from '../controllers/user-controller/BuySneakerController';


const Routes = Router()

const createSenakerController = new CreateSenakerController()
const createUserController = new CreateUserController()
const makeOfferController = new MakeOfferController()
const getAllUsersController = new GetAllUsersController()
const getAllSneakersController = new GetAllSneakersController()
const createBrandController = new CreateBrandController()
const createProblemController = new CreateProblemController()
const boxesController = new BoxesController()
const getAllBoxesController = new GetAllBoxesController()
const sneakerinBoxController = new SneakerinBoxController()
const addMoneyController = new AddMoneyController()
const VisualizerController = new visualizerController()
const createSenakerOwnerController = new CreateSenakerOwnerController()
const buySneakerController = new BuySneakerController()

const nodemailer = require("nodemailer")
const stripe = require('stripe')('sk_test_51NFmiuB44rleyHUGDyWn2d7P48h5BMW19mZg0ujRGtqaR8Y6rs20B0wxqtMvBB0i96E6ocxJAO8ckFHuKQG7kaB000LooKGoZ0')

Routes.post('/sneaker/:userId', 
createSneakerValidation, 
createSenakerController.handle)

Routes.post('/sneaker/owner/:ownerId',
createSenakerOwnerController.handle
)

Routes.post('/buy/sneaker/:buyerId/:tennisId/:sellerId',
buySneakerController.handle
)

Routes.post('/user',
createUserValidation,
createUserController.handle)

Routes.post('/offer/:userId/:tennisId',
makeOfferController.handle)

Routes.post('/brand', 
createBrandValidation,
createBrandController.handle)

Routes.post('/box', 
boxesController.create
)

Routes.patch('/users/:userId/money', addMoneyController.updateMoney);

Routes.post('/boxes/add-tennis', sneakerinBoxController.handle);

Routes.post('/problem',
createProblemController.handle
)

Routes.post('/box/sneaker', 
sneakerinBoxController.handle
)

Routes.get('/boxes/openBox/:boxId/:userId', boxesController.openBox);

Routes.get('/users',
getAllUsersController.handle)

Routes.get("/sneaker", 
getAllSneakersController.handle)

Routes.get('/box',
getAllBoxesController.handle
)

Routes.get("/owner/visualizer", VisualizerController.handle)

Routes.use(function(req, res, next) {
  throw new UnknowRoute('Unknown route', 404);
});


export { Routes }