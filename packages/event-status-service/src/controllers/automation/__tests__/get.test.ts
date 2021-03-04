import { Response } from 'express'
import getAutomationById from '../get'
import { db } from '../../../core/db'

jest.mock('../../../core/logger')
jest.mock('../../../core/db', () => {
  return {
    db: {
      get: jest.fn(() => ({
        id: 'SOME_ID',
        clientCode: 'SOME_CODE',
        messageChannel: 'sms',
        messageBody: 'messageBody',
        triggerOnEventType: 'enquiry',
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
    id: 'SOME_ID',
  },
}

const baseMockRes = {
  status: jest.fn(),
  json: jest.fn(),
}

describe('getAutomationById', () => {
  it('should return a 401 if the client code doesnt match', async () => {
    const mockReq: any = {
      ...baseMockReq,
      user: {
        ...baseMockReq.user,
        clientCode: 'INVALID_CODE',
      },
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await getAutomationById(mockReq, mockRes as Response)

    expect(db.get).toHaveBeenCalledWith({ id: baseMockReq.params.id })
    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.json).toHaveBeenCalledWith({
      code: 401,
      error: 'Unauthorized',
    })
  })

  it('should get an automation status', async () => {
    const mockReq: any = {
      ...baseMockReq,
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await getAutomationById(mockReq, mockRes as Response)

    expect(db.get).toHaveBeenCalledWith({ id: baseMockReq.params.id })
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({
      id: 'SOME_ID',
      clientCode: 'SOME_CODE',
      messageChannel: 'sms',
      messageBody: 'messageBody',
      triggerOnEventType: 'enquiry',
    })
  })

  afterAll(() => {
    jest.resetAllMocks()
  })
})
