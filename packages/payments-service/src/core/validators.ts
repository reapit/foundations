import dayjs from 'dayjs'
import { UpdatePaymentModel } from '../types/payment'
import logger from './logger'
import { ApiKey } from './schema'

export const validateApiKey = (result: ApiKey, traceId: string, clientCode: string, paymentId: string) => {
  const errors: string[] = []

  if (result.clientCode !== clientCode) errors.push('Client code supplied is not valid for this apiKey')

  if (result.paymentId !== paymentId) errors.push('Payment ID supplied is not valid for this apiKey')

  if (dayjs(result.keyExpiresAt).isBefore(dayjs())) errors.push('API key has expired')

  if (errors.length) throw new Error(errors.join(', '))

  logger.info('Successfully returned and validated payment record for API key', { traceId, result })
  return result
}

export const validatePaymentUpdate = (
  payment: Partial<UpdatePaymentModel>,
  traceId: string,
): UpdatePaymentModel | undefined => {
  const { status, externalReference } = payment
  const errors: string[] = []

  if (!externalReference) errors.push('External Reference is a required field')
  if (!status || (status && status !== 'posted' && status !== 'rejected'))
    errors.push('Status is required and should be either posted or rejected')
  if (errors.length) throw new Error(errors.join(', '))

  logger.info('Successfully returned and validated update payment', { traceId, payment })
  return {
    status,
    externalReference,
  }
}
