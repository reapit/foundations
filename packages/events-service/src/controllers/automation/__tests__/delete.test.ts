import { Response } from 'express'
import deleteAutomationById from '../delete'
import { db } from '../../../core/db'

jest.mock('../../../core/logger')
jest.mock('../../../core/db', () => {
  return {
    db: {
      delete: jest.fn(),
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

describe('deleteAutomationById', () => {
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

    await deleteAutomationById(mockReq, mockRes as Response)

    expect(db.delete).toHaveBeenCalledTimes(0)
    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.json).toHaveBeenCalledWith({
      code: 401,
      error: 'Unauthorized',
    })
  })

  it('should return a 204 when the automation is successfully deleted', async () => {
    const mockReq: any = {
      ...baseMockReq,
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await deleteAutomationById(mockReq, mockRes as Response)

    expect(db.delete).toHaveBeenCalledTimes(1)
    expect(db.delete).toHaveBeenCalledWith({ id: baseMockReq.params.id })
    expect(mockRes.status).toHaveBeenCalledWith(204)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })
})
