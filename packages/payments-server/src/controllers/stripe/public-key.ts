import { AppRequest, AppResponse } from '../../core/logger'

export const publicKey = (req: AppRequest, res: AppResponse) => {
  res.send({ publicKey: process.env.STRIPE_PUBLISHABLE_KEY })
}
