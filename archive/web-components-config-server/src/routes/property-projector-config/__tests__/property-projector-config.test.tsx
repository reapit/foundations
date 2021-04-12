import { AppRequest, AppResponse } from '../../../app'
import {
  propertyProjectorConfigGetByIdHandler,
  propertyProjectorConfigPutHandler,
} from '../property-projector-config'
import { propertyProjectorConfig } from '../__mocks__/property-projector-config'

jest.mock('../api', () => {
  return {
    getConfigByClientId: jest.fn(() => Promise.resolve(propertyProjectorConfig)),
    createConfig: jest.fn(() => Promise.resolve(propertyProjectorConfig)),
    putConfig: jest.fn(() => Promise.resolve(propertyProjectorConfig)),
    getConfigByOfficeId: jest.fn(() => Promise.resolve(propertyProjectorConfig)),
  }
})

describe('property-projector-config', () => {
  describe('propertyProjectorConfigPutHandler', () => {
    it('should update correctly and return service is running', async done => {
      const mockRequest = ({
        traceId: 'mockTraceId',
        headers: {},
        body: {
          logo: '',
          primaryColour: '#eeeeee',
          secondaryColour: '#000000',
          headerTextColour: '#FFFFFF',
          interval: 7,
          propertyLimit: 25,
          marketingMode: ['Sales', 'Lettings'],
          sellingStatuses: ['For Sale'],
          lettingStatuses: ['To Let'],
          minPrice: 100000,
          maxPrice: 1000000,
          minRent: 500,
          maxRent: 1000,
          showAddress: false,
          sortBy: 'price',
          departments: {
            G: ['house', 'bungalow'],
          },
          offices: ['XYZ', 'RPT'],
        },
        params: {
          customerId: 'RPT',
          officeId: 'CRT',
          traceId: 'mockUUID',
        },
      } as unknown) as AppRequest
      const mockResponse = ({
        send: jest.fn().mockReturnValue({}),
        status: jest.fn().mockReturnValue(200),
        sendStatus: jest.fn().mockReturnValue(200),
        json: jest.fn().mockReturnValue({}),
      } as unknown) as AppResponse
      await propertyProjectorConfigPutHandler(mockRequest, mockResponse)
      setTimeout(() => {
        expect(mockResponse.send).toBeCalledWith(propertyProjectorConfig)
        done()
      }, 1000)
    })
  })

  describe('propertyProjectorConfigGetByIdHandler', () => {
    it('should run correctly and return service is running', async done => {
      const mockRequest = ({
        traceId: 'mockTraceId',
        headers: {},
        body: {},
        params: {
          customerId: 'RPT',
          officeId: 'CRT',
          traceId: 'mockUUID',
        },
      } as unknown) as AppRequest
      const mockResponse = ({
        send: jest.fn().mockReturnValue({}),
        status: jest.fn().mockReturnValue(200),
        sendStatus: jest.fn().mockReturnValue(200),
        json: jest.fn().mockReturnValue({}),
      } as unknown) as AppResponse
      await propertyProjectorConfigGetByIdHandler(mockRequest, mockResponse)
      setTimeout(() => {
      expect(mockResponse.send).toBeCalledWith(propertyProjectorConfig)
      done()
    }, 1000)
    })
  })
})
