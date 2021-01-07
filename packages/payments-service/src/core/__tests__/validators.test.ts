import { UpdatePaymentModel } from '../../types/payment'
import logger from '../logger'
import { ApiKey } from '../schema'
import { validateApiKey, validatePaymentUpdate } from '../validators'

jest.mock('../logger', () => ({
  info: jest.fn(),
}))

describe('validateApiKey', () => {
  const stubTraceId = 'SOME_TRACE_ID'
  const stubClientCode = 'SOME_CLIENT_CODE'
  const stubPaymentId = 'SOME_PAYMENT_ID'
  it('should return a concatonated error and throw for invalid keys', () => {
    const invalidKey = {
      keyExpiresAt: new Date('2000-01-01').toISOString(),
    } as ApiKey

    expect(() => validateApiKey(invalidKey, stubTraceId, stubClientCode, stubPaymentId)).toThrowError(
      new Error(
        'Client code supplied is not valid for this apiKey, Payment ID supplied is not valid for this apiKey, API key has expired',
      ),
    )
  })

  it('should return the object and log success if valid', () => {
    const validKey = {
      apiKey: 'SOME_API_KEY',
      clientCode: 'SOME_CLIENT_CODE',
      paymentId: 'SOME_PAYMENT_ID',
      keyExpiresAt: new Date('2030-01-01').toISOString(),
    } as ApiKey

    expect(validateApiKey(validKey, stubTraceId, stubClientCode, stubPaymentId)).toEqual(validKey)
    expect(logger.info).toHaveBeenCalledWith('Successfully returned and validated payment record for API key', {
      traceId: stubTraceId,
      result: validKey,
    })
  })
})

describe('validatePaymentUpdate', () => {
  const stubTraceId = 'SOME_TRACE_ID'
  it('should return a concatonated error and throw for invalid payment', () => {
    const invalidPayment = {} as Partial<UpdatePaymentModel>

    expect(() => validatePaymentUpdate(invalidPayment, stubTraceId)).toThrowError(
      new Error('External Reference is a required field, Status is required and should be either posted or rejected'),
    )
  })

  it('should return the object and log success if valid', () => {
    const validPayment = {
      status: 'rejected',
      externalReference: 'SOME_EXTERNAL_REFERENCE',
    } as Partial<UpdatePaymentModel>

    expect(validatePaymentUpdate(validPayment, stubTraceId)).toEqual(validPayment)
    expect(logger.info).toHaveBeenCalledWith('Successfully returned and validated update payment', {
      traceId: stubTraceId,
      payment: validPayment,
    })
  })
})
