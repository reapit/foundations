import { createApiKey } from '../create-api-key'
import { logger } from '../../core/logger'
import { db } from '../../core/db'
import { Response } from 'express'

jest.mock('../../core/logger')
jest.mock('../../core/db')

const baseMockReq = {
  traceId: 'SOME_TRACE_ID',
  body: {
    clientCode: 'SOME_CODE',
    paymentId: 'SOME_PAYMENT_ID',
    keyExpiresAt: new Date('2030-01-01').toISOString(),
  },
}

const baseMockRes = {
  status: jest.fn(),
  json: jest.fn(),
}

describe('createApiKey', () => {
  it('should throw and catch if no clientCode is in the body', async () => {
    const mockReq = {
      ...baseMockReq,
      body: {
        ...baseMockReq.body,
        clientCode: undefined,
      },
    }

    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await createApiKey(mockReq, mockRes as Response)

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Bad request clientCode, paymentId, entityType and keyExpiresAt are required',
      code: 400,
    })
  })

  it('should throw and catch if no paymentId is in the body', async () => {
    const mockReq = {
      ...baseMockReq,
      body: {
        ...baseMockReq.body,
        paymentId: undefined,
      },
    }

    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await createApiKey(mockReq, mockRes as Response)

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Bad request clientCode, paymentId, entityType and keyExpiresAt are required',
      code: 400,
    })
  })

  it('should throw and catch if no keyExpiresAt is in the body', async () => {
    const mockReq = {
      ...baseMockReq,
      body: {
        ...baseMockReq.body,
        keyExpiresAt: undefined,
      },
    }

    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await createApiKey(mockReq, mockRes as Response)

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Bad request clientCode, paymentId, entityType and keyExpiresAt are required',
      code: 400,
    })
  })

  it('should create an api key and return a 201 to the user on success', async () => {
    const mockReq = {
      ...baseMockReq,
    }

    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    const mockApiKey = 'SOME_API_KEY'

    await createApiKey(mockReq, mockRes as Response, mockApiKey)

    expect(db.put).toHaveBeenCalledWith({
      apiKey: mockApiKey,
      clientCode: mockReq.body.clientCode,
      paymentId: mockReq.body.paymentId,
      keyCreatedAt: new Date().toISOString(),
      keyExpiresAt: mockReq.body.keyExpiresAt,
    })
    expect(logger.info).toHaveBeenCalledTimes(2)
    expect(logger.error).toHaveBeenCalledTimes(0)
    expect(mockRes.status).toHaveBeenCalledWith(201)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      apiKey: mockApiKey,
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
