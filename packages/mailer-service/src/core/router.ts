import { Router } from 'express'
import { createPaymentRequest } from '../controllers/create-payment-request'
import { createPaymentReceipt } from '../controllers/create-payment-receipt'

const router = Router()

router.post('/payments/request/:paymentId', createPaymentRequest)
router.post('/payments/receipt/:paymentId', createPaymentReceipt)

export default router
