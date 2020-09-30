import { Router } from 'express'
import { AppRequest, AppResponse } from './logger'
import { getAccount } from '../controllers/account/get-account'
import { authorizeStripe } from '../controllers/stripe/authorize-stripe'
import { stripeOauthLink } from '../controllers/stripe/oauth-link'
import { stripeOnboardUser } from '../controllers/stripe/onboard-user'
import { stripeOnboardUserRefresh } from '../controllers/stripe/onboard-user-refresh'
import { paymentIntent } from '../controllers/stripe/payment-intent'
import { publicKey } from '../controllers/stripe/public-key'

const router = Router()

router.get('/account/:customerCode', (req: AppRequest, res: AppResponse) => getAccount(req, res))
router.get('/stripe-authorize', (req: AppRequest, res: AppResponse) => authorizeStripe(req, res))
router.get('/stripe-oath-link/:customerCode', (req: AppRequest, res: AppResponse) => stripeOauthLink(req, res))
router.get('/stripe-onboard-user/refresh', (req: AppRequest, res: AppResponse) => stripeOnboardUserRefresh(req, res))
router.get('/stripe-onboard-user', (req: AppRequest, res: AppResponse) => stripeOnboardUser(req, res))
router.get('/stripe-public-key', (req: AppRequest, res: AppResponse) => publicKey(req, res))
router.post('/stripe-payment-intent', (req: AppRequest, res: AppResponse) => paymentIntent(req, res))

export default router
