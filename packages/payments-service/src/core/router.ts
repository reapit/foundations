import { Router } from 'express'
import { createApiKey } from '../controllers/create-api-key'
import { getPayment } from '../controllers/get-payment'
import { updatePayment } from '../controllers/update-payment'

const router = Router()

router.post('/api-key', createApiKey)
router.get('/payments/:paymentId', getPayment)
router.patch('/payments/:paymentId', updatePayment)

export default router
