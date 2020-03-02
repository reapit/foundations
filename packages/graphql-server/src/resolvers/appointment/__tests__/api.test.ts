jest.mock('@reapit/elements')
jest.mock('../../../logger')

import { fetcher, setQueryParams } from '@reapit/elements'
import logger from '../../../logger'
import errors from '../../../errors'

import { mockContext } from '../../../__mocks__/context'
import { appointments } from '../__mocks__/appointments'
import { appointment } from '../__mocks__/appointment'
import { createAppointmentArgs } from '../__mocks__/create-appointment-args'
import { updateAppointmentArgs } from '../__mocks__/update-appointment-args'
import { getAppointmentsArgs } from '../__mocks__/get-appointments-args'
import { getAppointmentByIdArgs } from '../__mocks__/get-appointment-by-id-args'

import {
  callCreateAppointmentByAPI,
  callGetAppointmentByIdAPI,
  callGetAppointmentsAPI,
  callUpdateAppointmentByIdAPI,
  URLS,
} from '../api'

import { API_VERSION } from '../../../constants/api'

const mockedFetcher = fetcher as jest.Mock
const mockedLogInfo = (logger.info as unknown) as jest.Mock
const mockedLogError = (logger.error as unknown) as jest.Mock

describe('appointment apis', () => {
  describe('callGetAppointmentsAPI', () => {
    it('should run the happy case correctly', async () => {
      mockedFetcher.mockImplementation(() => appointments)
      const result = await callGetAppointmentsAPI(getAppointmentsArgs, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.appointments}/?${setQueryParams(getAppointmentsArgs)}`,
        api: process.env['PLATFORM_API_BASE_URL'],
        method: 'GET',
        headers: {
          authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
        body: {},
      })

      expect(result).toEqual(appointments)

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetAppointmentsAPI', {
        args: getAppointmentsArgs,
        traceId: mockContext.traceId,
      })
    })

    it('should handle error case correctly', async () => {
      const mockedError = new Error('test')

      mockedFetcher.mockImplementation(() => {
        throw mockedError
      })
      const result = await callGetAppointmentsAPI(getAppointmentsArgs, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.appointments}/?${setQueryParams(getAppointmentsArgs)}`,
        api: process.env['PLATFORM_API_BASE_URL'],
        method: 'GET',
        headers: {
          authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
        body: {},
      })

      expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetAppointmentsAPI', {
        args: getAppointmentsArgs,
        traceId: mockContext.traceId,
      })

      expect(mockedLogError).toHaveBeenCalledWith('callGetAppointmentsAPI', {
        error: JSON.stringify(mockedError),
        traceId: mockContext.traceId,
      })
    })
  })

  describe('callGetAppointmentByIdAPI', () => {
    it('should run the happy case correctly', async () => {
      mockedFetcher.mockImplementation(() => appointment)
      const result = await callGetAppointmentByIdAPI(getAppointmentByIdArgs, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.appointments}/${getAppointmentByIdArgs.id}`,
        api: process.env['PLATFORM_API_BASE_URL'],
        method: 'GET',
        headers: {
          authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
      })

      expect(result).toEqual(appointment)

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetAppointmentByIdAPI', {
        args: getAppointmentByIdArgs,
        traceId: mockContext.traceId,
      })
    })

    it('should handle error case correctly', async () => {
      const mockedError = new Error('test')

      mockedFetcher.mockImplementation(() => {
        throw mockedError
      })
      const result = await callGetAppointmentByIdAPI(getAppointmentByIdArgs, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.appointments}/${getAppointmentByIdArgs.id}`,
        api: process.env['PLATFORM_API_BASE_URL'],
        method: 'GET',
        headers: {
          authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
      })

      expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetAppointmentByIdAPI', {
        args: getAppointmentByIdArgs,
        traceId: mockContext.traceId,
      })

      expect(mockedLogError).toHaveBeenCalledWith('callGetAppointmentByIdAPI', {
        error: JSON.stringify(mockedError),
        traceId: mockContext.traceId,
      })
    })
  })

  describe('callUpdateAppointmentByIdAPI', () => {
    {
      it('should run the happy case correctly', async () => {
        mockedFetcher.mockImplementation(() => appointment)
        const result = await callUpdateAppointmentByIdAPI(updateAppointmentArgs, mockContext)

        expect(fetcher).nthCalledWith(1, {
          url: `${URLS.appointments}/${updateAppointmentArgs.id}`,
          api: process.env['PLATFORM_API_BASE_URL'],
          body: updateAppointmentArgs,
          method: 'PATCH',
          headers: {
            authorization: mockContext.authorization,
            'Content-Type': 'application/json',
            'api-version': API_VERSION,
            'If-Match': updateAppointmentArgs._eTag,
          },
        })

        expect(fetcher).nthCalledWith(2, {
          url: `${URLS.appointments}/${updateAppointmentArgs.id}`,
          api: process.env['PLATFORM_API_BASE_URL'],
          method: 'GET',
          headers: {
            authorization: mockContext.authorization,
            'Content-Type': 'application/json',
            'api-version': API_VERSION,
          },
        })

        expect(result).toEqual(appointment)

        expect(mockedLogInfo).toHaveBeenCalledWith('callUpdateAppointmentByIdAPI', {
          args: updateAppointmentArgs,
          traceId: mockContext.traceId,
        })
      })

      it('should handle error case correctly', async () => {
        const mockedError = new Error('test')

        mockedFetcher.mockImplementation(() => {
          throw mockedError
        })
        const result = await callUpdateAppointmentByIdAPI(updateAppointmentArgs, mockContext)

        expect(fetcher).nthCalledWith(1, {
          url: `${URLS.appointments}/${updateAppointmentArgs.id}`,
          api: process.env['PLATFORM_API_BASE_URL'],
          body: updateAppointmentArgs,
          method: 'PATCH',
          headers: {
            authorization: mockContext.authorization,
            'Content-Type': 'application/json',
            'api-version': API_VERSION,
            'If-Match': updateAppointmentArgs._eTag,
          },
        })

        expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

        expect(mockedLogInfo).toHaveBeenCalledWith('callUpdateAppointmentByIdAPI', {
          args: updateAppointmentArgs,
          traceId: mockContext.traceId,
        })

        expect(mockedLogError).toHaveBeenCalledWith('callUpdateAppointmentByIdAPI', {
          error: JSON.stringify(mockedError),
          traceId: mockContext.traceId,
        })
      })
    }
  })

  describe('callCreateAppointmentByAPI', () => {
    {
      it('should run the happy case correctly', async () => {
        const result = await callCreateAppointmentByAPI(createAppointmentArgs, mockContext)

        expect(fetcher).toHaveBeenCalledWith({
          url: `${URLS.appointments}`,
          api: process.env['PLATFORM_API_BASE_URL'],
          body: createAppointmentArgs,
          method: 'POST',
          headers: {
            authorization: mockContext.authorization,
            'Content-Type': 'application/json',
            'api-version': API_VERSION,
          },
        })

        expect(result).toEqual(true)

        expect(mockedLogInfo).toHaveBeenCalledWith('callCreateAppointmentByAPI', {
          args: createAppointmentArgs,
          traceId: mockContext.traceId,
        })
      })

      it('should handle error case correctly', async () => {
        const mockedError = new Error('test')

        mockedFetcher.mockImplementation(() => {
          throw mockedError
        })

        const result = await callCreateAppointmentByAPI(createAppointmentArgs, mockContext)

        expect(fetcher).toHaveBeenCalledWith({
          url: `${URLS.appointments}`,
          api: process.env['PLATFORM_API_BASE_URL'],
          body: createAppointmentArgs,
          method: 'POST',
          headers: {
            authorization: mockContext.authorization,
            'Content-Type': 'application/json',
            'api-version': API_VERSION,
          },
        })

        expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

        expect(mockedLogInfo).toHaveBeenCalledWith('callCreateAppointmentByAPI', {
          args: createAppointmentArgs,
          traceId: mockContext.traceId,
        })

        expect(mockedLogError).toHaveBeenCalledWith('callCreateAppointmentByAPI', {
          error: JSON.stringify(mockedError),
          traceId: mockContext.traceId,
        })
      })
    }
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
