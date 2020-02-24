jest.mock('@reapit/elements')
jest.mock('../../../logger')

import { fetcher } from '@reapit/elements'
import qs from 'query-string'
import logger from '../../../logger'
import errors from '../../../errors'
import { mockContext } from '../../../__mocks__/context'
import { identityChecks } from '../__mocks__/identity-checks'
import { identityCheck } from '../__mocks__/identity-check'
import { CreateIdentityCheckModel } from '../../../types'
import { GetIdentityCheckByIdModel, GetIdentityChecksModel, UpdateIdentityCheckExtend } from '../services'
import {
  callGetIdentityChecksAPI,
  callGetIdentityCheckByIdAPI,
  callCreateIdentityCheckAPI,
  callUpdateIdentityCheckAPI,
  URLS,
  REAPIT_API_BASE_URL,
} from '../api'
import { API_VERSION } from '../../../constants/api'

describe('appointment identity-check', () => {
  let mockedFetcher
  let mockedLogInfo
  let mockedLogError

  beforeEach(() => {
    mockedFetcher = fetcher as jest.Mock
    mockedLogInfo = (logger.info as unknown) as jest.Mock
    mockedLogError = (logger.error as unknown) as jest.Mock
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  describe('callGetIdentityChecksAPI', () => {
    it('should run the happy case correctly', async done => {
      mockedFetcher.mockImplementation(() => identityChecks)
      const getIdentityChecksArgs = {
        pageNumber: 1,
        pageSize: 10,
        negotiatorId: '123',
        contactId: '123',
        ids: ['123', '456'],
        status: 'unknow',
      } as GetIdentityChecksModel
      const result = await callGetIdentityChecksAPI(getIdentityChecksArgs, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.identityChecks}?${qs.stringify(getIdentityChecksArgs)}`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: {
          Authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
        body: {},
      })

      expect(result).toEqual(identityChecks)

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetIdentityChecksAPI', {
        args: getIdentityChecksArgs,
        traceId: mockContext.traceId,
      })
      done()
    })

    it('should handle error case correctly', async done => {
      const mockedError = new Error('test')

      mockedFetcher.mockImplementation(() => {
        throw mockedError
      })
      const getIdentityChecksArgs = {
        pageNumber: 1,
        pageSize: 10,
        negotiatorId: '123',
        contactId: '123',
        ids: ['123', '456'],
        status: 'unknow',
      } as GetIdentityChecksModel
      const result = await callGetIdentityChecksAPI(getIdentityChecksArgs, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.identityChecks}?${qs.stringify(getIdentityChecksArgs)}`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: {
          Authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
        body: {},
      })

      expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetIdentityChecksAPI', {
        args: getIdentityChecksArgs,
        traceId: mockContext.traceId,
      })

      expect(mockedLogError).toHaveBeenCalledWith('callGetIdentityChecksAPI', {
        error: JSON.stringify(mockedError),
        traceId: mockContext.traceId,
      })
      done()
    })
  })

  describe('callGetIdentityCheckByIdAPI', () => {
    it('should run the happy case correctly', async done => {
      mockedFetcher.mockImplementation(() => identityCheck)
      const getIdentityCheckByIdArgs = {
        id: '123',
      } as GetIdentityCheckByIdModel
      const result = await callGetIdentityCheckByIdAPI(getIdentityCheckByIdArgs, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.identityChecks}/${getIdentityCheckByIdArgs.id}`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: {
          Authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
        body: {},
      })

      expect(result).toEqual(identityCheck)

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetIdentityCheckByIdAPI', {
        args: getIdentityCheckByIdArgs,
        traceId: mockContext.traceId,
      })
      done()
    })

    it('should handle error case correctly', async done => {
      const mockedError = new Error('test')

      mockedFetcher.mockImplementation(() => {
        throw mockedError
      })
      const getIdentityCheckByIdArgs = {
        id: '123',
      } as GetIdentityCheckByIdModel
      const result = await callGetIdentityCheckByIdAPI(getIdentityCheckByIdArgs, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.identityChecks}/${getIdentityCheckByIdArgs.id}`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: {
          Authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
        body: {},
      })

      expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetIdentityCheckByIdAPI', {
        args: getIdentityCheckByIdArgs,
        traceId: mockContext.traceId,
      })

      expect(mockedLogError).toHaveBeenCalledWith('callGetIdentityCheckByIdAPI', {
        error: JSON.stringify(mockedError),
        traceId: mockContext.traceId,
      })
      done()
    })
  })

  describe('callCreateIdentityCheckAPI', () => {
    it('should run the happy case correctly', async done => {
      mockedFetcher.mockImplementation(() => identityCheck)
      const createIdentityCheckArgs = {
        contactId: 'string',
        checkDate: 'string',
        status: 'pending',
        negotiatorId: 'string',
        identityDocument1: {},
        identityDocument2: {},
        metadata: {},
      } as CreateIdentityCheckModel
      const result = await callCreateIdentityCheckAPI(createIdentityCheckArgs, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.identityChecks}`,
        api: REAPIT_API_BASE_URL,
        method: 'POST',
        headers: {
          Authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
        body: createIdentityCheckArgs,
      })

      expect(result).toEqual(identityCheck)

      expect(mockedLogInfo).toHaveBeenCalledWith('callCreateIdentityCheckAPI', {
        args: createIdentityCheckArgs,
        traceId: mockContext.traceId,
      })
      done()
    })

    it('should handle error case correctly', async done => {
      const mockedError = new Error('test')

      mockedFetcher.mockImplementation(() => {
        throw mockedError
      })
      const createIdentityCheckArgs = {
        contactId: 'string',
        checkDate: 'string',
        status: 'pending',
        negotiatorId: 'string',
        identityDocument1: {},
        identityDocument2: {},
        metadata: {},
      } as CreateIdentityCheckModel
      const result = await callCreateIdentityCheckAPI(createIdentityCheckArgs, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.identityChecks}`,
        api: REAPIT_API_BASE_URL,
        method: 'POST',
        headers: {
          Authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
        body: createIdentityCheckArgs,
      })

      expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

      expect(mockedLogInfo).toHaveBeenCalledWith('callCreateIdentityCheckAPI', {
        args: createIdentityCheckArgs,
        traceId: mockContext.traceId,
      })

      expect(mockedLogError).toHaveBeenCalledWith('callCreateIdentityCheckAPI', {
        error: JSON.stringify(mockedError),
        traceId: mockContext.traceId,
      })
      done()
    })
  })

  describe('callUpdateIdentityCheckAPI', () => {
    it('should run the happy case correctly', async done => {
      mockedFetcher.mockImplementation(() => identityCheck)
      const updateIdentityCheckArgs = {
        id: '123',
        checkDate: 'string',
        status: 'pending',
        negotiatorId: 'string',
        identityDocument1: {},
        identityDocument2: {},
        metadata: {},
        _eTag: 'string',
      } as UpdateIdentityCheckExtend
      const result = await callUpdateIdentityCheckAPI(updateIdentityCheckArgs, mockContext)

      expect(fetcher).toHaveBeenCalledTimes(2)

      expect(result).toEqual(identityCheck)

      expect(mockedLogInfo).toHaveBeenCalledWith('callUpdateIdentityCheckAPI', {
        args: updateIdentityCheckArgs,
        traceId: mockContext.traceId,
      })
      done()
    })

    it('should handle error case correctly', async done => {
      const mockedError = new Error('test')

      mockedFetcher.mockImplementation(() => {
        throw mockedError
      })
      const updateIdentityCheckArgs = {
        id: '123',
        checkDate: 'string',
        status: 'pending',
        negotiatorId: 'string',
        identityDocument1: {},
        identityDocument2: {},
        metadata: {},
        _eTag: 'string',
      } as UpdateIdentityCheckExtend
      const result = await callUpdateIdentityCheckAPI(updateIdentityCheckArgs, mockContext)

      expect(fetcher).toHaveBeenCalledWith({
        url: `${URLS.identityChecks}/${updateIdentityCheckArgs.id}`,
        api: REAPIT_API_BASE_URL,
        method: 'PATCH',
        headers: {
          Authorization: mockContext.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
          'If-Match': updateIdentityCheckArgs._eTag,
        },
        body: updateIdentityCheckArgs,
      })

      expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

      expect(mockedLogInfo).toHaveBeenCalledWith('callUpdateIdentityCheckAPI', {
        args: updateIdentityCheckArgs,
        traceId: mockContext.traceId,
      })

      expect(mockedLogError).toHaveBeenCalledWith('callUpdateIdentityCheckAPI', {
        error: JSON.stringify(mockedError),
        traceId: mockContext.traceId,
      })
      done()
    })
  })
})
