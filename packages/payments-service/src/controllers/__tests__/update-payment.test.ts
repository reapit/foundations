import { updatePayment } from '../update-payment'
import { logger } from '../../core/logger'
import { db } from '../../core/db'
import { Response } from 'express'
import { updatePlatformPayment } from '../../services/update-payment'
import { validateApiKey, validatePaymentUpdate } from '../../core/validators'

jest.mock('../../services/update-payment', () => ({
  updatePlatformPayment: jest.fn(),
}))
jest.mock('../../core/logger')
jest.mock('../../core/validators')
jest.mock('../../core/db')

const baseMockReq = {
  traceId: 'SOME_TRACE_ID',
  headers: {
    ['x-api-key']: 'SOME_API_KEY',
    ['reapit-customer']: 'SOME_CODE',
    ['api-version']: '2020-01-31',
    ['if-match']: 'SOME_ETAG',
  },
  params: {
    paymentId: 'SOME_PAYMENT_ID',
  },
}

const baseMockRes = {
  status: jest.fn(),
  json: jest.fn(),
}

describe('updatePayment', () => {
  it('should throw and catch if no clientCode is in the headers', async () => {
    const mockReq = {
      ...baseMockReq,
      headers: {
        ...baseMockReq.headers,
        ['reapit-customer']: undefined,
      },
    }

    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await updatePayment(mockReq, mockRes as Response)

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Bad request Error: reapit-customer, api-version, _eTag and x-api-key are required headers',
      code: 400,
    })
  })

  it('should throw and catch if no api-version is in the headers', async () => {
    const mockReq = {
      ...baseMockReq,
      headers: {
        ...baseMockReq.headers,
        ['api-version']: undefined,
      },
    }

    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await updatePayment(mockReq, mockRes as Response)

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Bad request Error: reapit-customer, api-version, _eTag and x-api-key are required headers',
      code: 400,
    })
  })

  it('should throw and catch if no x-api-key is in the headers', async () => {
    const mockReq = {
      ...baseMockReq,
      headers: {
        ...baseMockReq.headers,
        ['x-api-key']: undefined,
      },
    }

    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await updatePayment(mockReq, mockRes as Response)

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Bad request Error: reapit-customer, api-version, _eTag and x-api-key are required headers',
      code: 400,
    })
  })

  it('should throw and catch if no if-match is in the headers', async () => {
    const mockReq = {
      ...baseMockReq,
      headers: {
        ...baseMockReq.headers,
        ['if-match']: undefined,
      },
    }

    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await updatePayment(mockReq, mockRes as Response)

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Bad request Error: reapit-customer, api-version, _eTag and x-api-key are required headers',
      code: 400,
    })
  })

  it('should throw and catch if no paymentId is in the parms', async () => {
    const mockReq = {
      ...baseMockReq,
      params: {},
    }

    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await updatePayment(mockReq, mockRes as Response)

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Bad request Error: paymentId is a required parameter',
      code: 400,
    })
  })

  it('should find an API key and return a 204 to the user on success', async () => {
    ;(validateApiKey as jest.Mock).mockReturnValueOnce({})
    ;(validatePaymentUpdate as jest.Mock).mockReturnValueOnce({})
    ;(updatePlatformPayment as jest.Mock).mockReturnValueOnce({})

    const mockReq = {
      ...baseMockReq,
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }
    const mockApiKey = 'SOME_API_KEY'

    await updatePayment(mockReq, mockRes as Response)

    expect(db.get).toHaveBeenCalledWith({
      apiKey: mockApiKey,
    })
    expect(logger.info).toHaveBeenCalledTimes(2)
    expect(mockRes.status).toHaveBeenCalledWith(204)
  })

  it('should not find an API key and return a 404 to the user on failure', async () => {
    ;(validateApiKey as jest.Mock).mockReturnValueOnce({})
    ;(updatePlatformPayment as jest.Mock).mockImplementation(() => {
      const err = new Error('')
      err.name = 'ItemNotFoundException'
      throw err
    })

    const mockReq = {
      ...baseMockReq,
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }
    const mockApiKey = 'SOME_API_KEY'

    await updatePayment(mockReq, mockRes as Response)

    expect(db.get).toHaveBeenCalledWith({
      apiKey: mockApiKey,
    })
    expect(logger.info).toHaveBeenCalledTimes(2)
    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
