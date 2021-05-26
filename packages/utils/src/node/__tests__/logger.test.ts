import { traceIdMiddleware, AppRequest, AppResponse, createParseLog } from '../logger'
import { Logger } from 'winston'

jest.mock('uuid', (): ({v4: () => string}) => {
  return {
    v4: () => 'mockUUID'
  }
})

describe('createParseLog', () => {
  it('should parse log and call logger correctly', () => {
    const mockToken = {
      method: jest.fn().mockReturnValue('GET'),
      url: jest.fn().mockReturnValue('/'),
      status: jest.fn().mockReturnValue(200),
      res: jest.fn().mockReturnValue('mock Res'),
      'response-time': jest.fn().mockReturnValue(300),
    }
    const mockReq = {
      traceId: 'mockTraceId',
      body: {},
      headers: {},
    } as AppRequest
    const mockRes = {} as AppResponse
    const mockLogger = ({ info: jest.fn() } as unknown) as Logger
    const result = createParseLog(mockLogger)(mockToken, mockReq, mockRes)
    expect(mockLogger.info).toBeCalledWith({
      traceId: mockReq.traceId,
      method: 'GET',
      endpoint: '/',
      status: 200,
      contentLength: 'mock Res',
      responseTime: 300,
      reqHeader: JSON.stringify(mockReq.headers),
      reqBody: JSON.stringify(mockReq.body),
    })
    expect(result).toEqual('GET / 200 mock Res - 300 ms')
  })
})

describe('traceIdMiddleware', () => {
  it('should add traceId to req', (done) => {
    const mockReq = {
      headers: {},
      body: {},
    } as AppRequest
    const mockRes = {} as AppResponse
    const mockNext = jest.fn()
    setTimeout(() => {
      traceIdMiddleware(mockReq, mockRes, mockNext)
      expect(mockNext).toBeCalled()
      expect(mockReq.traceId).toEqual('mockUUID')
      done()
    }, 1000)
  })
})
