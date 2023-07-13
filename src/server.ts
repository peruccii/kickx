import "express-async-errors"
import express, { NextFunction,Request, Response } from "express"
import { Routes } from './routes/routes';
import { AppError } from './errors/AppError';

const app = express()
var cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(Routes, cors())

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: `internal server error - ${err.message}`
  })
})

app.listen(3000, () => console.log("Server esta rodando na porta"));
