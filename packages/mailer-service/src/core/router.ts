import { Router } from 'express'
import { createPaymentRequest } from '../controllers/create-payment-request'

const router = Router()

router.post('/payments/request/:paymentId', createPaymentRequest)

export default router
