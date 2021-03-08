import { Response } from 'express'
import createAutomation from '../create'
import { db } from '../../../core/db'

jest.mock('../../../core/logger')
jest.mock('../../../core/db')

const baseMockReq = {
  user: {
    clientCode: 'SOME_CODE',
  },
  traceId: 'SOME_TRACE_ID',
  body: {
    clientCode: 'SOME_CODE',
    messageChannel: 'sms',
    messageBody: 'messageBody',
    triggerOnEventType: 'enquiry',
  },
}

const baseMockRes = {
  status: jest.fn(),
  json: jest.fn(),
}

describe('createAutomation', () => {
  it('should return a 401 if the clientCode doesnt match', async () => {
    const mockReq: any = {
      ...baseMockReq,
      body: {
        ...baseMockReq.body,
        clientCode: 'NO_MATCH',
      },
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await createAutomation(mockReq, mockRes as Response)

    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Unauthorized',
      code: 401,
    })
  })

  it('should create a new automation', async () => {
    const mockReq: any = {
      ...baseMockReq,
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await createAutomation(mockReq, mockRes as Response)

    expect(db.put).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        clientCode: mockReq.body.clientCode,
        messageChannel: mockReq.body.messageChannel,
        messageBody: mockReq.body.messageBody,
        triggerOnEventType: mockReq.body.triggerOnEventType,
        createdAt: '2019-10-10T22:39:51.389Z',
        updatedAt: '2019-10-10T22:39:51.389Z',
      }),
    )
    expect(mockRes.status).toHaveBeenCalledWith(201)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
