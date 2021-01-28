import { Router } from 'express'
import { createPaymentRequest } from '../controllers/create-payment-request'
import { createPaymentReciept } from '../controllers/create-payment-receipt'

const router = Router()

router.post('/payments/request/:paymentId', createPaymentRequest)
router.post('/payments/receipt/:paymentId', createPaymentReciept)

export default router
