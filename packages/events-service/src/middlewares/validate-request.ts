import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400)
    return res.json({ errors: errors.array() })
  }

  next()
}
