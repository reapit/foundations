import { Response } from 'express'

export const errorHandler = (err: Error, res: Response) => {
  const errorString = typeof err === 'string' ? err : JSON.stringify(err.message)
  const responseCode = Number(errorString.substring(1, 4)) || (errorString ? 400 : 500)
  console.error(errorString)
  res.status(responseCode)
  res.json(errorString)
  res.end()
}
