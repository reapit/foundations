import { healthGetHandler } from '../health'

describe('health', () => {
  describe('healthGetHandler', () => {
    it('should run correctly and return service is running', () => {
      const mockRequest = {}
      const mockResponse = {
        send: jest.fn().mockReturnValue({}),
      }
      const result = healthGetHandler(mockRequest, mockResponse)
      expect(result).toEqual({})
      expect(mockResponse.send).toBeCalled()
    })
  })
})
