import { EmailPaymentRequestTemplate, EmailPaymentReceiptTemplate } from '../types/payments'
import ejs from 'ejs'

export const createPaymentRequestTemplate = async (data: EmailPaymentRequestTemplate) =>
  ejs.renderFile(`${__dirname}/templates/create-payment-request.ejs`, data)

export const createPaymentReceiptTemplate = async (data: EmailPaymentReceiptTemplate) =>
  ejs.renderFile(`${__dirname}/templates/create-payment-receipt.ejs`, data)
