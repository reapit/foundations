import { Response } from 'express'

const errorHandler = (res: Response, status: number, message?: string, err?: Error) => {
  console.error(message, JSON.stringify(err))
  res.status(status)
  res.json({
    error: {
      status,
      message: message || 'Bad request'
    }
  })
  res.end()
}

export default errorHandler
