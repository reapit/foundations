import { NextFunction, Response } from 'express'
import { sendEmail } from '../core/ses-client'
import { AppRequest } from '@reapit/utils-node'
import { ClientConfig, EmailPaymentReceipt } from '../types/payments'
import configJson from '../../config.json'
import { createPaymentReceiptTemplate } from '../core/templates'
import logger from '../../../payments-service/src/core/logger'
import { currencySymbolMapper } from '@reapit/utils-common'

export const getValuesFromConfig = (clientCode: string, config = configJson) => {
  try {
    const {
      paymentRequest: { senderEmail, companyName, logoUri },
    }: ClientConfig = config.clients[clientCode]

    return { senderEmail, companyName, logoUri }
  } catch (err) {
    return {
      senderEmail: null,
      companyName: null,
      logoUri: null,
    }
  }
}

export const createPaymentReceiptInternal = async (
  req: AppRequest,
  res: Response,
  _next: NextFunction,
  config = configJson,
) => {
  try {
    const { receipientEmail, recipientName, paymentReason, paymentCurrency, paymentAmount }: EmailPaymentReceipt =
      req.body
    const clientCode: string | undefined = req.headers['reapit-customer'] as string
    const apiVersion: string | undefined = req.headers['api-version'] as string
    const { paymentId } = req.params
    const { senderEmail, companyName, logoUri } = getValuesFromConfig(clientCode, config)

    if (!recipientName || !receipientEmail || !paymentReason || !paymentCurrency || !paymentAmount)
      throw new Error(
        'recipientName, paymentCurrency, paymentAmount, receipientEmail and paymentReason are required fields',
      )
    if (!clientCode || !apiVersion) throw new Error('reapit-customer and api-version are required headers')
    if (!paymentId) throw new Error('paymentId is a required parameter')
    if (!senderEmail || !companyName || !logoUri)
      throw new Error('senderEmail, companyName and logoUri are required in config')

    const template = await createPaymentReceiptTemplate({
      senderEmail,
      companyName,
      logoUri,
      paymentCurrency: currencySymbolMapper(paymentCurrency),
      paymentReason,
      recipientName,
      paymentDate: new Date().toDateString(),
      paymentAmount: `${paymentAmount.toFixed(2)}`,
    })

    const mail = await sendEmail(receipientEmail, `Payment Confirmation from ${companyName}`, template, senderEmail)

    if (mail) {
      res.status(200)
      return res.end()
    }

    throw new Error('Email failed to send')
  } catch (err) {
    logger.error('Email successfully sent', { traceId: req.traceId, error: err })
    res.status(400)
    res.send({ errors: err.message })
  }
}
