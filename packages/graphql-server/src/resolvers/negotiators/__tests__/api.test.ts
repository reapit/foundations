jest.mock('@reapit/elements')
jest.mock('../../../logger')

import { fetcher, setQueryParams } from '@reapit/elements'
import logger from '../../../logger'
import errors from '../../../errors'
import { mockContext } from '../../../__mocks__/context'
import { negotiatorStub } from '../__mocks__/negotiator'
import { negotiatorsStub } from '../__mocks__/negotiators'
import { createArgStub } from '../__mocks__/create-arg'
import { updateArgStub } from '../__mocks__/update-arg'
import { GetNegotiatorByIdArgs } from '../negotiator'

import {
  callGetNegotiatorByIdAPI,
  callGetNegotiatorsAPI,
  callCreateNegotiatorAPI,
  callUpdateNegotiatorAPI,
  URLS,
  REAPIT_API_BASE_URL,
  NEGOTIATORS_PER_PAGE,
} from '../api'

import { API_VERSION } from '../../../constants/api'

const mockedFetcher = fetcher as jest.Mock
const mockedLogInfo = (logger.info as unknown) as jest.Mock
const mockedLogError = (logger.error as unknown) as jest.Mock

describe('negotiator apis', () => {
  describe('callGetNegotiatorsAPI', () => {
    it('should run the happy case correctly', async () => {
      mockedFetcher.mockImplementation(() => negotiatorsStub)
      const mockArg = {}
      const result = await callGetNegotiatorsAPI(mockArg, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.negotiators}/?${setQueryParams({ ...mockArg, pageSize: NEGOTIATORS_PER_PAGE })}`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: {
          Authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
      })

      expect(result).toEqual(negotiatorsStub)

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetNegotiatorsAPI', {
        args: mockArg,
        traceId: mockContext.traceId,
      })
    })

    it('should handle error case correctly', async () => {
      const mockedError = new Error('test')

      mockedFetcher.mockImplementation(() => {
        throw mockedError
      })
      const mockArg = {}
      const result = await callGetNegotiatorsAPI(mockArg, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.negotiators}/?${setQueryParams(mockArg)}`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: {
          Authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
      })

      expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetNegotiatorsAPI', {
        args: mockArg,
        traceId: mockContext.traceId,
      })

      expect(mockedLogError).toHaveBeenCalledWith('callGetNegotiatorsAPI', {
        error: mockedError,
        traceId: mockContext.traceId,
      })
    })
  })

  describe('callGetNegotiatorByIdAPI', () => {
    it('should run correctly', async () => {
      mockedFetcher.mockImplementation(() => negotiatorStub)
      const mockArg: GetNegotiatorByIdArgs = { id: 'MGL' }
      const result = await callGetNegotiatorByIdAPI(mockArg, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.negotiators}/${mockArg.id}`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: {
          Authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
      })

      expect(result).toEqual(negotiatorStub)

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetNegotiatorByIdAPI', {
        args: mockArg,
        traceId: mockContext.traceId,
      })
    })

    it('should handle error case correctly', async () => {
      const mockedError = new Error('test')

      mockedFetcher.mockImplementation(() => {
        throw mockedError
      })
      const mockArg: GetNegotiatorByIdArgs = { id: 'MGL' }
      const result = await callGetNegotiatorByIdAPI(mockArg, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.negotiators}/${mockArg.id}`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: {
          Authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
      })

      expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetNegotiatorByIdAPI', {
        args: mockArg,
        traceId: mockContext.traceId,
      })

      expect(mockedLogError).toHaveBeenCalledWith('callGetNegotiatorByIdAPI', {
        error: mockedError,
        traceId: mockContext.traceId,
      })
    })
  })

  describe('callCreateNegotiatorAPI', () => {
    it('should run correctly', async () => {
      mockedFetcher.mockImplementation(() => negotiatorStub)
      const result = await callCreateNegotiatorAPI(createArgStub, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.negotiators}`,
        api: REAPIT_API_BASE_URL,
        method: 'POST',
        headers: {
          Authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
        body: createArgStub,
      })

      expect(result).toEqual(true)

      expect(mockedLogInfo).toHaveBeenCalledWith('callCreateNegotiatorAPI', {
        args: createArgStub,
        traceId: mockContext.traceId,
      })
    })

    it('should handle error case correctly', async () => {
      const mockedError = new Error('test')

      mockedFetcher.mockImplementation(() => {
        throw mockedError
      })
      const result = await callCreateNegotiatorAPI(createArgStub, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.negotiators}`,
        api: REAPIT_API_BASE_URL,
        method: 'POST',
        headers: {
          Authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
        body: createArgStub,
      })

      expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

      expect(mockedLogInfo).toHaveBeenCalledWith('callCreateNegotiatorAPI', {
        args: createArgStub,
        traceId: mockContext.traceId,
      })

      expect(mockedLogError).toHaveBeenCalledWith('callCreateNegotiatorAPI', {
        error: mockedError,
        traceId: mockContext.traceId,
      })
    })
  })

  describe('callUpdateNegotiatorAPI', () => {
    {
      it('should run correctly', async () => {
        mockedFetcher.mockImplementation(() => negotiatorStub)
        const result = await callUpdateNegotiatorAPI(updateArgStub, mockContext)

        expect(fetcher).nthCalledWith(1, {
          url: `${URLS.negotiators}/${updateArgStub.id}`,
          api: REAPIT_API_BASE_URL,
          body: updateArgStub,
          method: 'PATCH',
          headers: {
            Authorization: mockContext.authorization,
            'Content-Type': 'application/json',
            'api-version': API_VERSION,
          },
        })

        expect(fetcher).nthCalledWith(2, {
          url: `${URLS.negotiators}/${updateArgStub.id}`,
          api: REAPIT_API_BASE_URL,
          method: 'GET',
          headers: {
            Authorization: mockContext.authorization,
            'Content-Type': 'application/json',
            'api-version': API_VERSION,
          },
        })

        expect(result).toEqual(negotiatorStub)

        expect(mockedLogInfo).toHaveBeenCalledWith('callUpdateNegotiatorAPI', {
          args: updateArgStub,
          traceId: mockContext.traceId,
        })
      })

      it('should handle error case correctly', async () => {
        const mockedError = new Error('test')

        mockedFetcher.mockImplementation(() => {
          throw mockedError
        })
        const result = await callUpdateNegotiatorAPI(updateArgStub, mockContext)

        expect(fetcher).nthCalledWith(1, {
          url: `${URLS.negotiators}/${updateArgStub.id}`,
          api: REAPIT_API_BASE_URL,
          body: updateArgStub,
          method: 'PATCH',
          headers: {
            Authorization: mockContext.authorization,
            'Content-Type': 'application/json',
            'api-version': API_VERSION,
          },
        })

        expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

        expect(mockedLogInfo).toHaveBeenCalledWith('callUpdateNegotiatorAPI', {
          args: updateArgStub,
          traceId: mockContext.traceId,
        })

        expect(mockedLogError).toHaveBeenCalledWith('callUpdateNegotiatorAPI', {
          error: mockedError,
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
