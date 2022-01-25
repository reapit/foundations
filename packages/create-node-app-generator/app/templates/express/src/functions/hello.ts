import { Request, Response } from 'express'

export const hello = (request: Request, response: Response) => {
  console.log('called express endpoint')

  response.send('Hello there!')
}
