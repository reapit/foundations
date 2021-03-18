import { Response } from 'express'
import listEvents from '../list'
import { DecoratedEvents } from '../../../services/decorated-events'
import stubbedEvent from '../../../services/__stubs__/event'

jest.mock('twilio')
jest.mock('../../../core/logger')
jest.mock('../../../core/db', () => {
  return {
    db: {
      query: () => [{ eventId: 'SOME_ID', clientCode: 'SOME_CODE' }],
    },
  }
})

const baseMockReq = {
  header: () => 'token',
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

describe('listEvents', () => {
  it('should return a 400 with the message `Unauthorized clientCode` if the clientCode doesnt match', async () => {
    const mockReq: any = {
      ...baseMockReq,
      query: {
        ...baseMockReq.query,
        clientCode: 'NO_MATCH',
      },
      header: () => 'token',
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await listEvents(mockReq, mockRes as Response)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenLastCalledWith({
      error: 'Bad request Error: Unauthorized clientCode',
      code: 400,
    })
  })

  it('should instantiate the DecoratedEvents class and call the correct methods', async () => {
    const mockReq: any = {
      ...baseMockReq,
    }
    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    // @ts-ignore
    const mockRetrieveByEventStatusList = (DecoratedEvents.prototype.retrieveByEventStatusList = jest.fn(async () => [
      stubbedEvent,
    ]))
    const mockRetrieveByRecentEvents = (DecoratedEvents.prototype.retrieveByRecentEvents = jest.fn(async () => [
      stubbedEvent,
    ]))

    await listEvents(mockReq, mockRes as Response)

    expect(mockRetrieveByEventStatusList).toHaveBeenCalledTimes(1)
    expect(mockRetrieveByRecentEvents).toHaveBeenCalledTimes(1)
    expect(mockRetrieveByEventStatusList).toHaveBeenCalledWith([{ eventId: 'SOME_ID', clientCode: 'SOME_CODE' }])
    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith([stubbedEvent, stubbedEvent])
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
