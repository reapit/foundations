import { parseLog, AppRequest, AppResponse, traceIdMiddleware } from '../app'

jest.mock('../logger')
jest.mock('uuid/v4', (): (() => string) => {
  return () => 'mockUUID'
})

describe('app', () => {
  describe('parseLog', () => {
    it('should parse log correctly', () => {
      const mockToken = {
        method: jest.fn().mockReturnValue('GET'),
        url: jest.fn().mockReturnValue('/'),
        status: jest.fn().mockReturnValue(200),
        res: jest.fn().mockReturnValue('mock Res'),
        'response-time': jest.fn().mockReturnValue(300),
      }
      const mockReq = {
        traceId: 'mockTraceId',
        headers: {},
        body: {},
      } as AppRequest
      const mockRes = {} as AppResponse
      const result = parseLog(mockToken, mockReq, mockRes)
      expect(result).toEqual('GET / 200 mock Res - 300 ms')
    })
  })

  describe('traceIdMiddleware', () => {
    it('should add traceId to req', done => {
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
})
