import { Router } from 'express'
import { createPaymentRequest } from '../controllers/create-payment-request'
import { createPaymentReceiptInternal } from '../controllers/create-payment-receipt-internal'
import { createPaymentReceiptExternal } from '../controllers/create-payment-receipt-external'

const router = Router()

router.post('/payments/request/:paymentId', createPaymentRequest)
router.post('/payments/receipt/internal/:paymentId', createPaymentReceiptInternal)
router.post('/payments/receipt/external/:paymentId', createPaymentReceiptExternal)

export default router
