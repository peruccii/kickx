import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Endereco from '../DAO/user-dao/creates/Endereco';

export const enderecoExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.userId ? req.params.userId : req.params.userId;
  if (isNaN(Number(id))) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Não foi possível identificar o usuário" });
  }
  const verificar = await Endereco.findByUser(String(id));

  if (req.method == "DELETE") {
    if (verificar.length == 1) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Você deve ter no minímo um endereço" });
    }
  }

  verificar.map((item: any) => {
    if (
      item.endereco.cep == req.body.cep &&
      item.endereco.complemento == req.body.complemento
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Endereço já existe" });
    }
  });

  return next();
};