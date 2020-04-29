import { AppRequest, AppResponse } from '../../../app'
import {
  webComponentsConfigGetByIdHandler,
  webComponentsConfigPutHandler,
  webComponentsConfigPatchHandler,
  webComponentsConfigDeleteHandler,
} from '../web-components-config'
import { webComponentConfig } from '../__mocks__/web-components-config'

jest.mock('../api', () => {
  return {
    getConfigByClientId: jest.fn(() => Promise.resolve(webComponentConfig)),
    createConfig: jest.fn(() => Promise.resolve(webComponentConfig)),
    updateConfig: jest.fn(() => Promise.resolve(webComponentConfig)),
    deleteConfig: jest.fn(() => Promise.resolve(webComponentConfig)),
  }
})

describe('web-components-config', () => {
  describe('webComponentsConfigGetByIdHandler', () => {
    it('should run correctly and return service is running', async done => {
      const mockRequest = ({
        traceId: 'mockTraceId',
        headers: {},
        body: {},
        params: {
          clientId: '1',
          traceId: 'mockUUID',
        },
      } as unknown) as AppRequest
      const mockResponse = ({
        send: jest.fn().mockReturnValue({}),
        status: jest.fn().mockReturnValue(200),
        sendStatus: jest.fn().mockReturnValue(200),
        json: jest.fn().mockReturnValue({}),
      } as unknown) as AppResponse
      await webComponentsConfigGetByIdHandler(mockRequest, mockResponse)
      setTimeout(() => {
        expect(mockResponse.send).toBeCalledWith(webComponentConfig)
        done()
      }, 1000)
    })
  })

  describe('webComponentsConfigPutHandler', () => {
    it('should run correctly and return service is running', async done => {
      const mockRequest = ({
        traceId: 'mockTraceId',
        headers: {},
        body: webComponentConfig,
        params: {
          clientId: '1',
          traceId: 'mockUUID',
        },
      } as unknown) as AppRequest
      const mockResponse = ({
        send: jest.fn().mockReturnValue({}),
        status: jest.fn().mockReturnValue(200),
        sendStatus: jest.fn().mockReturnValue(200),
        json: jest.fn().mockReturnValue({}),
      } as unknown) as AppResponse
      await webComponentsConfigPutHandler(mockRequest, mockResponse)
      setTimeout(() => {
        expect(mockResponse.send).toBeCalledWith(webComponentConfig)
        done()
      }, 1000)
    })
  })

  describe('webComponentsConfigPatchHandler', () => {
    it('should run correctly and return service is running', async done => {
      const mockRequest = ({
        traceId: 'mockTraceId',
        headers: {},
        body: {},
        params: {
          clientId: '1',
          traceId: 'mockUUID',
        },
      } as unknown) as AppRequest
      const mockResponse = ({
        send: jest.fn().mockReturnValue({}),
        status: jest.fn().mockReturnValue(200),
        sendStatus: jest.fn().mockReturnValue(200),
        json: jest.fn().mockReturnValue({}),
      } as unknown) as AppResponse
      await webComponentsConfigPatchHandler(mockRequest, mockResponse)
      setTimeout(() => {
        expect(mockResponse.send).toBeCalledWith(webComponentConfig)
        done()
      }, 1000)
    })
  })

  describe('webComponentsConfigDeleteHandler', () => {
    it('should run correctly and return service is running', async done => {
      const mockRequest = ({
        traceId: 'mockTraceId',
        headers: {},
        body: {},
        params: {
          clientId: '1',
          traceId: 'mockUUID',
        },
      } as unknown) as AppRequest
      const mockResponse = ({
        send: jest.fn().mockReturnValue({}),
        status: jest.fn().mockReturnValue(200),
        sendStatus: jest.fn().mockReturnValue(200),
        json: jest.fn().mockReturnValue({}),
      } as unknown) as AppResponse
      await webComponentsConfigDeleteHandler(mockRequest, mockResponse)
      setTimeout(() => {
        expect(mockResponse.send).toBeCalledWith(webComponentConfig)
        done()
      }, 1000)
    })
  })
})
