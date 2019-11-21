import { Response } from 'express'

const errorHandler = (res: Response, status: number, message: string) => {
  console.error(message)
  res.status(status)
  res.json({
    error: {
      status,
      message
    }
  })
  res.end()
}

export default errorHandler
