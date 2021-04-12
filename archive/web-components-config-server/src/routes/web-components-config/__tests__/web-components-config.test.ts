import { AppRequest, AppResponse } from '../../../app'
import {
  webComponentsConfigGetByIdHandler,
  webComponentsConfigPatchHandler,
  webComponentsConfigDeleteHandler,
  webComponentsConfigPutHandler,
  webComponentsConfigPostHandler,
} from '../web-components-config'
import { webComponentConfig } from '../__mocks__/web-components-config'

jest.mock('../api', () => {
  return {
    getConfigByClientId: jest.fn(() => Promise.resolve(webComponentConfig)),
    createConfig: jest.fn(() => Promise.resolve(webComponentConfig)),
    patchConfig: jest.fn(() => Promise.resolve(webComponentConfig)),
    deleteConfig: jest.fn(() => Promise.resolve(webComponentConfig)),
    putConfig: jest.fn(() => Promise.resolve(webComponentConfig)),
  }
})

describe('web-components-config', () => {
  describe('webComponentsConfigPutHandler', () => {
    it('should update correctly and return service is running', async done => {
      const mockRequest = ({
        traceId: 'mockTraceId',
        headers: {},
        body: {
          customerId: 'DXX',
          appId: '1',
          appointmentLength: 1,
          daysOfWeek: [1],
          appointmentTimeGap: 5,
          appointmentTypes: [],
          negotiatorIds: [],
        },
        params: {
          clientId: '1',
          appId: '1',
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

  describe('webComponentsConfigPostHandler', () => {
    it('should run correctly and return service is running', async done => {
      const mockRequest = ({
        traceId: 'mockTraceId',
        headers: {},
        body: {
          customerId: 'DXX',
          appId: '1',
          appointmentLength: 303,
          appointmentTimeGap: 5,
          appointmentTypes: [
            {
              M: {
                value: {
                  S: 'value1',
                },
                id: {
                  S: 'id1',
                },
              },
            },
          ],
          negotiatorIds: [
            {
              S: 'AAAN',
            },
          ],
          daysOfWeek: [],
        },
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
      await webComponentsConfigPostHandler(mockRequest, mockResponse)
      setTimeout(() => {
        expect(mockResponse.send).toBeCalledWith(webComponentConfig)
        done()
      }, 1000)
    })
  })

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
