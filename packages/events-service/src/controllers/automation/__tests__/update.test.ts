import { Response } from 'express'
import updateAutomationById from '../update'
import { db } from '../../../core/db'

jest.mock('../../../core/logger')
jest.mock('../../../core/db', () => {
  return {
    db: {
      get: jest.fn(() => ({
        id: 'SOME_ID',
        clientCode: 'SOME_CODE',
        triggerOnEventType: 'oldTrigger',
      })),
      update: jest.fn(() => ({
        id: 'SOME_ID',
        clientCode: 'SOME_CODE',
        triggerOnEventType: 'newTrigger',
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
  body: {
    triggerOnEventType: 'newTrigger',
  },
}

const baseMockRes = {
  status: jest.fn(),
  json: jest.fn(),
}

describe('updateStatusById', () => {
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

    await updateAutomationById(mockReq, mockRes as Response)

    expect(db.get).toHaveBeenCalledWith({ id: baseMockReq.params.id })
    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.json).toHaveBeenCalledWith({
      code: 401,
      error: 'Unauthorized',
    })
  })

  it('should update an event status', async () => {
    const mockReq: any = {
      ...baseMockReq,
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await updateAutomationById(mockReq, mockRes as Response)

    expect(db.get).toHaveBeenCalledWith({ id: baseMockReq.params.id })
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({
      id: 'SOME_ID',
      clientCode: 'SOME_CODE',
      triggerOnEventType: 'newTrigger',
    })
  })

  afterAll(() => {
    jest.resetAllMocks()
  })
})
