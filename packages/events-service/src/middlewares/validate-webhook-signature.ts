import { NextFunction, Request, Response } from 'express'
import { ALLOWED_WEBHOOK_SIGNATURES } from '../core/constants'

export default (req: Request, res: Response, next: NextFunction) => {
  const signature = req.headers['reapit-webhook-signature'] as string

  if (ALLOWED_WEBHOOK_SIGNATURES.includes(signature)) {
    return next()
  }

  res.status(401)
  return res.json({ status: 401, error: 'Invalid `reapit-webhook-signature` header supplied' })
}
