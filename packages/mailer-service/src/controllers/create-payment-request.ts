import { NextFunction, Response } from 'express'
import { sendEmail } from '../core/ses-client'
import { AppRequest } from '@reapit/node-utils'
import { ClientConfig, EmailPaymentRequest } from '../types/payments'
import configJson from '../../config.json'
import { createPaymentRequestTemplate } from '../core/templates'
import logger from '../../../payments-service/src/core/logger'
import { currencySymbolMapper } from '@reapit/utils'

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

export const createPaymentRequest = async (
  req: AppRequest,
  res: Response,
  _next: NextFunction,
  config = configJson,
) => {
  try {
    const {
      receipientEmail,
      recipientName,
      paymentReason,
      paymentCurrency,
      paymentAmount,
      paymentExpiry,
    }: EmailPaymentRequest = req.body
    const { traceId } = req
    const apiKey: string | undefined = req.headers['x-api-key']
    const clientCode: string | undefined = req.headers['reapit-customer']
    const apiVersion: string | undefined = req.headers['api-version']
    const { paymentId } = req.params
    const { senderEmail, companyName, logoUri } = getValuesFromConfig(clientCode, config)

    if (!paymentExpiry || !recipientName || !receipientEmail || !paymentReason || !paymentCurrency || !paymentAmount)
      throw new Error(
        'paymentExpiry, recipientName, paymentCurrency, paymentAmount, receipientEmail and paymentReason are required fields',
      )
    if (!clientCode || !apiKey || !apiVersion)
      throw new Error('reapit-customer, api-version and x-api-key are required headers')
    if (!paymentId) throw new Error('paymentId is a required parameter')
    if (!senderEmail || !companyName || !logoUri)
      throw new Error('senderEmail, companyName and logoUri are required in config')

    logger.info('Request successfully validated', { traceId })

    const template = await createPaymentRequestTemplate({
      senderEmail,
      companyName,
      logoUri,
      paymentReason,
      paymentCurrency: currencySymbolMapper(paymentCurrency),
      url: `${process.env.PAYMENTS_APP_URI}/payments/${paymentId}?session=${apiKey}&clientCode=${clientCode}`,
      recipientName,
      paymentExpiry: new Date(paymentExpiry).toDateString(),
      paymentAmount: `${(paymentAmount / 100).toFixed(2)}`,
    })

    logger.info('Template successfully created', { traceId })

    const mail = await sendEmail(receipientEmail, `Payment Request from ${companyName}`, template, senderEmail)

    if (mail) {
      logger.info('Email successfully sent', { traceId })
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
