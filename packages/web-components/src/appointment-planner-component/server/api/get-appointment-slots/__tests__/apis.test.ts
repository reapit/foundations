import { AppRequest } from '../../../../../../../utils/src/node/logger'
import {
  getOfficesByPostcode,
  getWebComponentConfigForReapitCustomer,
  getAppointmentsByNegotiatorsIdsAndDateRange,
} from '../apis'
import { fetcher } from '../../../../../common/utils/fetcher-server'
import { officesDataStub } from '../stubs/offices'
import { stringify } from 'querystring'
import { logger } from '../../../core/logger'
import { getServerHeaders } from '../../../../../common/utils/get-server-headers'
import { configDataStub } from '../stubs/config'
import { appointmentsDataStub } from '../../__stubs__/appointments'

jest.mock('../../../core/logger')
jest.mock('../../../../../common/utils/fetcher-server')
jest.mock('../../../../../common/utils/get-server-headers')

describe('get-appointment-slots API', () => {
  beforeAll(() => {
    process.env.PLATFORM_API_BASE_URL = 'https://localhost.com'
    process.env.WEB_COMPONENT_CONFIG_API = 'https://localhost.com'
  })

  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('getAppointmentsByNegotiatorsIdsAndDateRange', () => {
    test('happy case', async () => {
      const mockRequest = ({
        traceId: '123',
        query: {
          postcode: '123',
          dateFrom: '2021-01-31T00:00:00.000Z',
          dateTo: '2021-02-02T00:00:00.000Z',
        },
      } as unknown) as AppRequest
      ;(fetcher as jest.Mock).mockReturnValueOnce(appointmentsDataStub)

      const mockNegotiatorIds = ['ABC']
      const url = new URL(
        `${process.env.PLATFORM_API_BASE_URL}/appointments/?${stringify({
          end: mockRequest.query?.dateTo,
          negotiatorId: mockNegotiatorIds,
          start: mockRequest.query?.dateFrom,
        })}`,
      )

      const mockHeader = 'header'
      ;(getServerHeaders as jest.Mock).mockResolvedValue(mockHeader)

      expect(await getAppointmentsByNegotiatorsIdsAndDateRange(mockRequest, mockNegotiatorIds)).toEqual(
        appointmentsDataStub,
      )

      expect(fetcher).toHaveBeenCalledWith({
        url: String(url),
        headers: mockHeader,
      })

      expect(logger.info).toHaveBeenCalledWith('getAppointmentsByNegotiatorsIdsAndDateRange', {
        traceId: mockRequest.traceId,
        postcode: mockRequest.query.postcode,
      })
    })
  })

  describe('getWebComponentConfigForReapitCustomer', () => {
    test('happy case', async () => {
      const mockRequest = ({
        traceId: '123',
        query: {
          postcode: '123',
        },
        headers: {
          'reapit-customer': 'A',
        },
      } as unknown) as AppRequest
      ;(fetcher as jest.Mock).mockReturnValueOnce(configDataStub)

      const url = new URL(
        `${process.env.WEB_COMPONENT_CONFIG_API}/${mockRequest.headers['reapit-customer']}/${process.env.APPOINMENT_PLANNER_APP_ID}`,
      )

      const mockHeader = 'header'
      ;(getServerHeaders as jest.Mock).mockResolvedValue(mockHeader)

      expect(await getWebComponentConfigForReapitCustomer(mockRequest)).toEqual(configDataStub)

      expect(fetcher).toHaveBeenCalledWith({
        url: String(url),
        headers: mockHeader,
      })

      expect(logger.info).toHaveBeenCalledWith('getWebComponentConfigForReapitCustomer', {
        traceId: mockRequest.traceId,
        postcode: mockRequest.query.postcode,
      })
    })
  })

  describe('getOfficesByPostcode', () => {
    test('happy case', async () => {
      const mockRequest = ({
        traceId: '123',
        query: {
          postcode: '123',
        },
      } as unknown) as AppRequest
      ;(fetcher as jest.Mock).mockReturnValueOnce(officesDataStub)

      const url = new URL(
        `${process.env.PLATFORM_API_BASE_URL}/offices/?${stringify({
          address: mockRequest.query?.postcode,
          embed: 'negotiators',
        })}`,
      )

      const mockHeader = 'header'
      ;(getServerHeaders as jest.Mock).mockResolvedValue(mockHeader)

      expect(await getOfficesByPostcode(mockRequest)).toEqual(officesDataStub)

      expect(fetcher).toHaveBeenCalledWith({
        url: String(url),
        headers: mockHeader,
      })

      expect(logger.info).toHaveBeenCalledWith('getOfficesByPostcode', {
        traceId: mockRequest.traceId,
        postcode: mockRequest.query.postcode,
      })
    })
  })
})
