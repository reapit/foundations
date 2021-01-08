import { Response } from 'express'
import createEventStatus from '../create'
import { db } from '../../../core/db'

jest.mock('../../../core/logger')
jest.mock('../../../core/db')

const baseMockReq = {
  user: {
    clientCode: 'SOME_CODE',
  },
  traceId: 'SOME_TRACE_ID',
  body: {
    eventId: 'xyz',
    clientCode: 'SOME_CODE',
    status: 'outstanding',
    eventCreatedAt: new Date('2021-01-01'),
  },
}

const baseMockRes = {
  status: jest.fn(),
  json: jest.fn(),
}

describe('createEventStatus', () => {
  it('should return a 401 if the clientCode doesnt match', async () => {
    const mockReq = {
      ...baseMockReq,
      body: {
        ...baseMockReq.body,
        clientCode: 'NO_MATCH',
      },
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await createEventStatus(mockReq, mockRes as Response)

    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Unauthorized',
      code: 401,
    })
  })

  it('should create a new event status', async () => {
    const mockReq = {
      ...baseMockReq,
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await createEventStatus(mockReq, mockRes as Response)

    expect(db.put).toHaveBeenCalledWith(
      {
        eventId: mockReq.body.eventId,
        clientCode: mockReq.body.clientCode,
        status: mockReq.body.status,
        eventCreatedAt: mockReq.body.eventCreatedAt.toISOString(),
        statusCreatedAt: '2019-10-10T22:39:51.389Z',
        statusUpdatedAt: '2019-10-10T22:39:51.389Z',
      },
      expect.any(Object),
    )
    expect(mockRes.status).toHaveBeenCalledWith(201)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
