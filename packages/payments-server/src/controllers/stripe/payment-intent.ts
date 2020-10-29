import { stripe } from '../../core/stripe'
import { AppRequest, AppResponse } from '../../core/logger'

export const paymentIntent = async (req: AppRequest, res: AppResponse) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create(req.body)
    res.json(paymentIntent)
  } catch (err) {
    res.json(err)
  }
}
