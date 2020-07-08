import { generateConfigurationBatchLoaderFn, generateConfigurationLoader } from '../dataloader'
import { appointmentTypesMock, appointmentTypeMock } from '../__mocks__/appointmentTypes'
import { ServerContext } from '../../..'

jest.mock('../../../logger')
jest.mock('../services', () => ({
  getConfigurationByTypeAndId: jest.fn(() => appointmentTypeMock),
  getConfigurationsByType: jest.fn(() => appointmentTypesMock),
}))

describe('configuration-dataloader', () => {
  describe('generateConfigurationBatchLoaderFn', () => {
    it('should run correctly', () => {
      const mockContext = {
        traceId: 'mockTraceID',
        authorization: 'mockAuthorization',
        dataLoader: {
          configurationLoader: jest.fn() as any,
          propertyLoader: jest.fn() as any,
          officeLoader: jest.fn() as any,
          negotiatorLoader: jest.fn() as any,
        },
      } as ServerContext
      const fn = generateConfigurationBatchLoaderFn(mockContext)
      const mockKeys = ['AP']
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })

    it('should run correctly without keys', () => {
      const mockContext = {
        traceId: 'mockTraceID',
        authorization: 'mockAuthorization',
        dataLoader: {
          configurationLoader: jest.fn() as any,
          propertyLoader: jest.fn() as any,
          officeLoader: jest.fn() as any,
          negotiatorLoader: jest.fn() as any,
        },
      } as ServerContext
      const fn = generateConfigurationBatchLoaderFn(mockContext)
      const mockKeys = []
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })
  })
  describe('generateConfigurationLoader', () => {
    it('should return correctly', () => {
      const mockContext = {
        traceId: 'mockTraceID',
        authorization: 'mockAuthorization',
        dataLoader: {
          configurationLoader: jest.fn() as any,
          propertyLoader: jest.fn() as any,
          officeLoader: jest.fn() as any,
          negotiatorLoader: jest.fn() as any,
        },
      } as ServerContext
      const result = generateConfigurationLoader(mockContext)
      expect(result).toEqual(expect.any(Object))
    })
  })
})
