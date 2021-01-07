import { getPayment } from '../get-payment'
import { logger } from '../../core/logger'
import { db } from '../../core/db'
import { Response } from 'express'
import { getPlatformPayment } from '../../services/get-payment'
import { validateApiKey } from '../../core/validators'

jest.mock('../../services/get-payment', () => ({
  getPlatformPayment: jest.fn(),
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
  },
  params: {
    paymentId: 'SOME_PAYMENT_ID',
  },
}

const baseMockRes = {
  status: jest.fn(),
  json: jest.fn(),
}

describe('getPayment', () => {
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

    await getPayment(mockReq, mockRes as Response)

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Bad request Error: reapit-customer, api-version and x-api-key are required headers',
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

    await getPayment(mockReq, mockRes as Response)

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Bad request Error: reapit-customer, api-version and x-api-key are required headers',
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

    await getPayment(mockReq, mockRes as Response)

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Bad request Error: reapit-customer, api-version and x-api-key are required headers',
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

    await getPayment(mockReq, mockRes as Response)

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Bad request Error: paymentId is a required parameter',
      code: 400,
    })
  })

  it('should find an API key and return a 200 to the user on success', async () => {
    ;(validateApiKey as jest.Mock).mockReturnValueOnce({})
    ;(getPlatformPayment as jest.Mock).mockReturnValueOnce({})

    const mockReq = {
      ...baseMockReq,
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }
    const mockApiKey = 'SOME_API_KEY'

    await getPayment(mockReq, mockRes as Response)

    expect(db.get).toHaveBeenCalledWith({
      apiKey: mockApiKey,
    })
    expect(logger.info).toHaveBeenCalledTimes(1)
    expect(logger.error).toHaveBeenCalledTimes(0)
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      payment: {},
    })
  })

  it('should not find an API key and return a 404 to the user on failure', async () => {
    ;(validateApiKey as jest.Mock).mockReturnValueOnce({})
    ;(getPlatformPayment as jest.Mock).mockImplementation(() => {
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

    await getPayment(mockReq, mockRes as Response)

    expect(db.get).toHaveBeenCalledWith({
      apiKey: mockApiKey,
    })
    expect(logger.info).toHaveBeenCalledTimes(1)
    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
