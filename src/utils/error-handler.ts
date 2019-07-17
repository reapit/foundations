import { Response } from 'aws-serverless-express'

export const handleError = (res: Response, status: number, message?: string) => {
  res.status(status)
  res.json({
    error: {
      status,
      message: message || 'Bad request'
    }
  })
  res.end()
}


export const handle404 = (req: Request, res: Response) => {
  console.log('404 error', req, res)
  res
  
  .json({
    error: {
      name: 'Error',
      status: 404,
      message: 'Unknown resource',
      statusCode: 404
    }
  })
}

export const handle403 = (req: Request, res: Response) => {
  console.log('403 error', req, res)
  res.json({
    error: {
      name: 'Error',
      status: 403,
      message: 'User not authorised',
      statusCode: 403
    }
  })
}

export const handle500 = (req: Request, res: Response) => {
  console.log('500 error', req, res)
  res.json({
    error: {
      name: 'Error',
      status: 500,
      message: 'Server error',
      statusCode: 500
    }
  })
}
