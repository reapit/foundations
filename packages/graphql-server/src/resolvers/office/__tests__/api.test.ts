jest.mock('@reapit/elements')
jest.mock('../../../logger')

import { fetcher } from '@reapit/elements'
import logger from '../../../logger'
import errors from '../../../errors'

import { mockContext } from '../../../__mocks__/context'
import { officeStub } from '../__mocks__/office'
import { officesStub } from '../__mocks__/offices'
import { createOfficeStub } from '../__mocks__/create-office'
import { updateOfficeStub } from '../__mocks__/update-office'
import { getOfficeStub } from '../__mocks__/get-office'
import { getOfficesStub } from '../__mocks__/get-offices'

import { callCreateOfficeAPI, callGetOfficeByIdAPI, callGetOfficesAPI, callUpdateOfficeAPI } from '../api'

const mockedFetcher = fetcher as jest.Mock
const mockedLogInfo = (logger.info as unknown) as jest.Mock
const mockedLogError = (logger.error as unknown) as jest.Mock

describe('offices apis', () => {
  describe('callGetOfficesAPI', () => {
    it('should run correctly', async () => {
      mockedFetcher.mockImplementation(() => officesStub)
      const result = await callGetOfficesAPI(getOfficesStub, mockContext)

      expect(result).toEqual(officesStub)

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetOfficesAPI', {
        args: getOfficesStub,
        traceId: mockContext.traceId,
      })
    })

    it('should handle error case correctly', async () => {
      const mockedError = new Error('test')

      mockedFetcher.mockImplementation(() => {
        throw mockedError
      })
      const result = await callGetOfficesAPI(getOfficesStub, mockContext)

      expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetOfficesAPI', {
        args: getOfficesStub,
        traceId: mockContext.traceId,
      })

      expect(mockedLogError).toHaveBeenCalledWith('callGetOfficesAPI', {
        error: mockedError,
        traceId: mockContext.traceId,
      })
    })
  })

  describe('callGetOfficeByIdAPI', () => {
    it('should run correctly', async () => {
      mockedFetcher.mockImplementation(() => officeStub)
      const result = await callGetOfficeByIdAPI(getOfficeStub, mockContext)

      expect(result).toEqual(officeStub)

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetOfficeByIdAPI', {
        args: getOfficeStub,
        traceId: mockContext.traceId,
      })
    })

    it('should handle error case correctly', async () => {
      const mockedError = new Error('error')

      mockedFetcher.mockImplementation(() => {
        throw mockedError
      })
      const result = await callGetOfficeByIdAPI(getOfficeStub, mockContext)

      expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

      expect(mockedLogInfo).toHaveBeenCalledWith('callGetOfficeByIdAPI', {
        args: getOfficeStub,
        traceId: mockContext.traceId,
      })

      expect(mockedLogError).toHaveBeenCalledWith('callGetOfficeByIdAPI', {
        error: mockedError,
        traceId: mockContext.traceId,
      })
    })
  })

  describe('callUpdateOfficeAPI', () => {
    {
      it('should run correctly', async () => {
        mockedFetcher.mockImplementation(() => officeStub)
        const result = await callUpdateOfficeAPI(updateOfficeStub, mockContext)

        expect(result).toEqual(officeStub)

        expect(mockedLogInfo).toHaveBeenCalledWith('callUpdateOfficeAPI', {
          args: updateOfficeStub,
          traceId: mockContext.traceId,
        })
      })

      it('should handle error case correctly', async () => {
        const mockedError = new Error('test')

        mockedFetcher.mockImplementation(() => {
          throw mockedError
        })
        const result = await callUpdateOfficeAPI(updateOfficeStub, mockContext)

        expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

        expect(mockedLogInfo).toHaveBeenCalledWith('callUpdateOfficeAPI', {
          args: updateOfficeStub,
          traceId: mockContext.traceId,
        })

        expect(mockedLogError).toHaveBeenCalledWith('callUpdateOfficeAPI', {
          error: mockedError,
          traceId: mockContext.traceId,
        })
      })
    }
  })

  describe('callCreateOfficeAPI', () => {
    {
      it('should run correctly', async () => {
        const result = await callCreateOfficeAPI(createOfficeStub, mockContext)

        expect(result).toEqual(true)

        expect(mockedLogInfo).toHaveBeenCalledWith('callCreateOfficeAPI', {
          args: createOfficeStub,
          traceId: mockContext.traceId,
        })
      })

      it('should handle error case correctly', async () => {
        const mockedError = new Error('test')

        mockedFetcher.mockImplementation(() => {
          throw mockedError
        })

        const result = await callCreateOfficeAPI(createOfficeStub, mockContext)

        expect(result).toEqual(errors.generateUserInputError(mockContext.traceId))

        expect(mockedLogInfo).toHaveBeenCalledWith('callCreateOfficeAPI', {
          args: createOfficeStub,
          traceId: mockContext.traceId,
        })

        expect(mockedLogError).toHaveBeenCalledWith('callCreateOfficeAPI', {
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
