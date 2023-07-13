import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthentication(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  if(!authToken){
    return response.status(401).json({
      message: "Token is missing"
    })
  }

  const [, token] = authToken.split(" ")

  try {
    verify(token, "5ad1ca5e-8d09-46d8-9b0a-b4a8ba58577b")
    return next()

  }catch(err){
    return response.status(401).json({
      message: "Token invalid"
    })
  }
}