import { Response } from 'express'

export const errorHandler = (err: Error, res: Response) => {
  const errorString = JSON.stringify(err.message)
  const responseCode = Number(errorString.substring(1, 4)) || 500
  console.error(err.message)
  res.status(responseCode)
  res.json(err.message)
  res.end()
}
