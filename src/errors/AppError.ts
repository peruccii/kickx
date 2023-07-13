export class AppError {
  public  readonly message: string
  public readonly statusCode: number

  constructor(message: string, statusCode: number){
    this.message = message
    this.statusCode = statusCode
  }
}

export class BadRequestError extends AppError {
  constructor(message: string){
    super(message, 400)
  }
}

export class UnknowRoute extends AppError {
  constructor(message: string , statusCode: number) {
    super(message, statusCode);
  }
}