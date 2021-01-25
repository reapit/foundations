import { Response } from 'express'
import { sendEmail } from '../core/ses-client'
import { AppRequest } from '@reapit/node-utils'
import ejs from 'ejs'
import { ClientConfig, EmailPaymentRequest, EmailPaymentRequestTemplate } from '../types/payments'
import config from '../../config.json'

export const createPaymentRequestTemplate = async (data: EmailPaymentRequestTemplate) =>
  ejs.renderFile(`${__dirname}/templates/create-payment-request.ejs`, data)

export const createPaymentRequest = async (req: AppRequest, res: Response) => {
  try {
    const {
      receipientEmail,
      recipientName,
      paymentReason,
      paymentCurrency,
      paymentAmount,
      paymentExpiry,
    }: EmailPaymentRequest = req.body
    const apiKey: string | undefined = req.headers['x-api-key']
    const clientCode: string | undefined = req.headers['reapit-customer']
    const apiVersion: string | undefined = req.headers['api-version']
    const { paymentId } = req.params
    const {
      paymentRequest: { senderEmail, companyName, logoUri },
    }: ClientConfig = config.clients[clientCode]

    if (!paymentExpiry || !recipientName || !receipientEmail || !paymentReason || !paymentCurrency || !paymentAmount)
      throw new Error(
        'paymentExpiry, recipientName, paymentCurrency, paymentAmount, receipientEmail and paymentReason are required fields',
      )
    if (!clientCode || !apiKey || !apiVersion)
      throw new Error('reapit-customer, api-version and x-api-key are required headers')
    if (!paymentId) throw new Error('paymentId is a required parameter')
    if (!senderEmail || !companyName || !logoUri) throw new Error('no client config was present in the service')

    const template = await createPaymentRequestTemplate({
      senderEmail,
      companyName,
      logoUri,
      paymentReason,
      url: `${process.env.PAYMENTS_APP_URI}/payments/${paymentId}?session=${apiKey}`,
      recipientName,
      paymentExpiry: new Date(paymentExpiry).toLocaleDateString(),
      paymentAmount: `${paymentCurrency} ${paymentAmount}`,
    })

    const mail = await sendEmail(receipientEmail, `Payment Request from ${companyName}`, template, senderEmail)
    if (mail) {
      return res.status(200).end()
    }

    throw new Error('Email failed to send')
  } catch (err) {
    console.error('Error is ', err.message)
    res.status(400)
    res.send({ errors: err.message })
  }
}
