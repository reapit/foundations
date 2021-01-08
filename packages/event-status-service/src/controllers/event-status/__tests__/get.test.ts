import { Response } from 'express'
import getStatusById from '../get'
import { db } from '../../../core/db'

jest.mock('../../../core/logger')
jest.mock('../../../core/db', () => {
  return {
    db: {
      get: jest.fn(() => ({
        eventId: 'SOME_ID',
        clientCode: 'SOME_CODE',
      })),
    },
  }
})

const baseMockReq = {
  user: {
    clientCode: 'SOME_CODE',
  },
  traceId: 'SOME_TRACE_ID',
  params: {
    eventId: 'SOME_ID',
  },
}

const baseMockRes = {
  status: jest.fn(),
  json: jest.fn(),
}

describe('getStatusById', () => {
  it('should return a 401 if the client code doesnt match', async () => {
    const mockReq = {
      ...baseMockReq,
      user: {
        ...baseMockReq.user,
        clientCode: 'INVALID_CODE',
      },
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await getStatusById(mockReq, mockRes as Response)

    expect(db.get).toHaveBeenCalledWith({ eventId: baseMockReq.params.eventId })
    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.json).toHaveBeenCalledWith({
      code: 401,
      error: 'Unauthorized',
    })
  })

  it('should get an event status', async () => {
    const mockReq = {
      ...baseMockReq,
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await getStatusById(mockReq, mockRes as Response)

    expect(db.get).toHaveBeenCalledWith({ eventId: baseMockReq.params.eventId })
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({
      eventId: 'SOME_ID',
      clientCode: 'SOME_CODE',
    })
  })

  afterAll(() => {
    jest.resetAllMocks()
  })
})
