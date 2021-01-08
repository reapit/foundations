import { Response } from 'express'
import listStatuses from '../list'

jest.mock('../../../core/logger')
jest.mock('../../../core/db', () => {
  return {
    db: {
      query: jest.fn(() => [
        {
          eventId: 'SOME_ID',
          clientCode: 'SOME_CODE',
        },
      ]),
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
    status: 'outstanding',
    dateFrom: new Date('2021-01-01'),
    dateTo: new Date('2021-02-01'),
  },
}

const baseMockRes = {
  status: jest.fn(),
  json: jest.fn(),
}

describe('listStatuses', () => {
  it('should return a 401 if the clientCode doesnt match', async () => {
    const mockReq = {
      ...baseMockReq,
      query: {
        ...baseMockReq.query,
        clientCode: 'NO_MATCH',
      },
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await listStatuses(mockReq, mockRes as Response)

    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Unauthorized',
      code: 401,
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
