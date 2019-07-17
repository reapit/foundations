import { Request, Response } from 'express';

export const refreshApi = (req: Request, res: Response) => {
  console.log('refreshing', req, res)
}