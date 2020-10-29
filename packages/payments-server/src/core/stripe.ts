import StripeSDK from 'stripe'

export const stripe = new StripeSDK(process.env.STRIPE_SECRET_KEY, {} as any)
