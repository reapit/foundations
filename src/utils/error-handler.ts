import { Response } from 'express'

const errorHandler = (res: Response, status: number, message?: string, err?: Error) => {
  console.error(message, JSON.stringify((err && err.message) || ''))
  res.status(status)
  res.json({
    error: {
      status,
      message: `${message} ${(err && err.message) || ''}` || 'Bad request'
    }
  })
  res.end()
}

export default errorHandler
