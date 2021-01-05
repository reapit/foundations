import { AppRequest, AppResponse } from '@reapit/node-utils'
import { Router } from 'express'
import { createApiKey } from '../controllers/create-api-key'
import { getPayment } from '../controllers/get-payment'
import { updatePayment } from '../controllers/update-payment'

const router = Router()

router.post('/api-key', (req: AppRequest, res: AppResponse) => createApiKey(req, res))
router.get('/payments/:paymentId', (req: AppRequest, res: AppResponse) => getPayment(req, res))
router.patch('/payments/:paymentId', (req: AppRequest, res: AppResponse) => updatePayment(req, res))

export default router
