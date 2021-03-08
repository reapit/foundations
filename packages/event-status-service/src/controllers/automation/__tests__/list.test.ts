import { Response } from 'express'
import listAutomations from '../list'

jest.mock('../../../core/logger')
jest.mock('../../../core/db', () => {
  return {
    db: {
      query: jest.fn(() =>
        new Set().add({
          id: 'SOME_ID',
          clientCode: 'SOME_CODE',
          messageChannel: 'sms',
          messageBody: 'messageBody',
          triggerOnEventType: 'enquiry',
        }),
      ),
    },
  }
})

const baseMockReq = {
  user: {
    clientCode: 'SOME_CODE',
  },
  traceId: 'SOME_TRACE_ID',
  query: {
    clientCode: 'SOME_CODE',
  },
}

const baseMockRes = {
  status: jest.fn(),
  json: jest.fn(),
}

describe('listAutomations', () => {
  it('should return a 401 if the clientCode doesnt match', async () => {
    const mockReq: any = {
      ...baseMockReq,
      query: {
        ...baseMockReq.query,
        clientCode: 'NO_MATCH',
      },
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await listAutomations(mockReq, mockRes as Response)

    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Unauthorized',
      code: 401,
    })
  })

  xit('should return results', async () => {
    const mockReq: any = {
      ...baseMockReq,
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await listAutomations(mockReq, mockRes as Response)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenLastCalledWith([
      {
        id: 'SOME_ID',
        clientCode: 'SOME_CODE',
        messageChannel: 'sms',
        messageBody: 'messageBody',
        triggerOnEventType: 'enquiry',
      },
    ])
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
