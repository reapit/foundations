import { createPaymentReceipt } from '../create-payment-receipt'
import { Response } from 'express'
import { createPaymentReceiptTemplate } from '../../core/templates'

jest.mock('../../core/ses-client', () => ({
  sendEmail: jest.fn(() => true),
}))

jest.mock('../../core/templates', () => ({
  createPaymentReceiptTemplate: jest.fn(() => ''),
}))

jest.mock('axios', () => ({
  get: jest.fn(() => true),
}))

const baseMockReq = {
  body: {
    receipientEmail: 'TEST_VALUE',
    recipientName: 'TEST_VALUE',
    paymentReason: 'TEST_VALUE',
    paymentCurrency: 'TEST_VALUE',
    paymentAmount: 'TEST_VALUE',
  },
  headers: {
    ['x-api-key']: 'TEST_VALUE',
    ['reapit-customer']: 'TEST_VALUE',
    ['api-version']: 'TEST_VALUE',
  },
  params: {
    paymentId: 'TEST_VALUE',
  },
}

const baseMockRes = {
  status: jest.fn(),
  send: jest.fn(),
  end: jest.fn(),
} as Object

const baseMockConfig = {
  clients: {
    TEST_VALUE: {
      paymentRequest: {
        senderEmail: 'TEST_VALUE',
        companyName: 'TEST_VALUE',
        logoUri: 'TEST_VALUE',
      },
    },
  },
} as any

const mockNext = jest.fn()

describe('createPaymentReceipt', () => {
  const headers = ['x-api-key', 'reapit-customer', 'api-version']
  const bodyParams = ['receipientEmail', 'recipientName', 'paymentReason', 'paymentCurrency', 'paymentAmount']
  const params = ['paymentId']
  const config = ['senderEmail', 'companyName', 'logoUri']

  headers.forEach(header => {
    it(`should validate ${header} header is present`, async () => {
      const mockReq = {
        ...baseMockReq,
        headers: {
          ...baseMockReq.headers,
          [header]: null,
        },
      }
      const mockRes = {
        ...baseMockRes,
      } as Response

      await createPaymentReceipt(mockReq, mockRes, mockNext, baseMockConfig)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.send).toHaveBeenCalledWith({
        errors: 'reapit-customer, api-version and x-api-key are required headers',
      })
    })
  })

  bodyParams.forEach(param => {
    it(`should validate ${param} body param is present`, async () => {
      const mockReq = {
        ...baseMockReq,
        body: {
          ...baseMockReq.body,
          [param]: null,
        },
      }
      const mockRes = {
        ...baseMockRes,
      } as Response

      await createPaymentReceipt(mockReq, mockRes, mockNext, baseMockConfig)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.send).toHaveBeenCalledWith({
        errors: 'recipientName, paymentCurrency, paymentAmount, receipientEmail and paymentReason are required fields',
      })
    })
  })

  params.forEach(param => {
    it(`should validate ${param} param is present`, async () => {
      const mockReq = {
        ...baseMockReq,
        params: {
          ...baseMockReq.params,
          [param]: null,
        },
      }
      const mockRes = {
        ...baseMockRes,
      } as Response

      await createPaymentReceipt(mockReq, mockRes, mockNext, baseMockConfig)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.send).toHaveBeenCalledWith({
        errors: 'paymentId is a required parameter',
      })
    })
  })

  config.forEach(configItem => {
    it(`should validate ${configItem} config item is present`, async () => {
      const mockConfig = {
        clients: {
          TEST_VALUE: {
            paymentRequest: {
              ...baseMockConfig.clients.TEST_VALUE.paymentRequest,
              [configItem]: null,
            },
          },
        },
      } as any

      const mockReq = {
        ...baseMockReq,
      }

      const mockRes = {
        ...baseMockRes,
      } as Response

      await createPaymentReceipt(mockReq, mockRes, mockNext, mockConfig)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.send).toHaveBeenCalledWith({
        errors: 'senderEmail, companyName and logoUri are required in config',
      })
    })
  })

  it('should correctly return a 200 error if email is successfully sent', async () => {
    const mockReq = {
      ...baseMockReq,
    }

    const mockRes = {
      ...baseMockRes,
    } as Response

    await createPaymentReceipt(mockReq, mockRes, mockNext, baseMockConfig)

    expect(createPaymentReceiptTemplate).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.end).toHaveBeenCalledTimes(1)
  })
})
