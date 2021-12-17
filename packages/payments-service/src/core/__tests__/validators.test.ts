import { UpdatePaymentModel } from '../../types/payment'
import { ApiKey } from '../schema'
import { validateApiKey, validatePaymentUpdate } from '../validators'

jest.mock('../logger', () => ({
  info: jest.fn(),
}))

describe('validateApiKey', () => {
  const stubClientCode = 'SOME_CLIENT_CODE'
  const stubPaymentId = 'SOME_PAYMENT_ID'
  it('should return a concatonated error and throw for invalid keys', () => {
    const invalidKey = {
      keyExpiresAt: new Date('2000-01-01').toISOString(),
    } as ApiKey

    expect(() => validateApiKey(invalidKey, stubClientCode, stubPaymentId)).toThrowError(
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

    expect(validateApiKey(validKey, stubClientCode, stubPaymentId)).toEqual(validKey)
  })
})

describe('validatePaymentUpdate', () => {
  const stubTraceId = 'SOME_TRACE_ID'
  it('should return a concatonated error and throw for invalid payment', () => {
    const invalidPayment = {} as Partial<UpdatePaymentModel>

    expect(() => validatePaymentUpdate(invalidPayment)).toThrowError(
      new Error('External Reference is a required field, Status is required and should be either posted or rejected'),
    )
  })

  it('should return the object and log success if valid', () => {
    const validPayment = {
      status: 'rejected',
      externalReference: 'SOME_EXTERNAL_REFERENCE',
    } as Partial<UpdatePaymentModel>

    expect(validatePaymentUpdate(validPayment, stubTraceId)).toEqual(validPayment)
  })
})
