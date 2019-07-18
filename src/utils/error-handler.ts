import { Response } from 'express'

const errorHandler = (res: Response, status: number, message?: string) => {
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