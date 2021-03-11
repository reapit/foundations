import { Response } from 'express'
import listStatuses from '../list'

jest.mock('../../../core/logger')
jest.mock('../../../core/db', () => {
  return {
    db: {
      query: () =>
        new Set().add({
          eventId: 'SOME_ID',
          clientCode: 'SOME_CODE',
        }),
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

    await listStatuses(mockReq, mockRes as Response)

    expect(mockRes.status).toHaveBeenCalledWith(401)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Unauthorized',
      code: 401,
    })
  })

  it('should return results', async () => {
    const mockReq: any = {
      ...baseMockReq,
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await listStatuses(mockReq, mockRes as Response)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenLastCalledWith([
      {
        eventId: 'SOME_ID',
        clientCode: 'SOME_CODE',
      },
    ])
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
