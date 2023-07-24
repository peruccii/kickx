import { Request, Response } from 'express';
import { visualizer } from './visualizer';

export class visualizerController {
  async handle(req: Request, res: Response): Promise<void> {
    const visualizerOwner = new visualizer();
    await visualizerOwner.execute(req, res);
  }
}
