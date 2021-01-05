import { AppRequest, AppResponse } from '@reapit/node-utils'
import { Router } from 'express'
import { createApiKey } from '../controllers/api-keys/create-api-key'
import { getAccount } from '../controllers/payments/get-payment-request'

const router = Router()

router.post('/api-key', (req: AppRequest, res: AppResponse) => createApiKey(req, res))
router.get('/payments/:paymentId', (req: AppRequest, res: AppResponse) => getAccount(req, res))
router.patch('/payments/:paymentId', (req: AppRequest, res: AppResponse) => getAccount(req, res))

export default router
