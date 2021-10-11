import { fetcher, fetcherWithRawUrl, fetcherWithReturnHeader } from '@reapit/utils-common'
import {
  approveAppRevisionById,
  createAppAPI,
  createAppRevisionAPI,
  deleteAppById,
  featureAppById,
  fetchAppApiKey,
  fetchAppById,
  fetchAppByIdByRawUrl,
  fetchAppDetail,
  fetchAppRevisionsById,
  fetchAppRevisionsList,
  fetchAppSecretByIdAPI,
  fetchAppsListAPI,
  fetchDesktopIntegrationTypes,
  rejectAppRevisionById,
  unfeatureAppById,
} from '../apps'

jest.mock('@reapit/utils-common')
jest.mock('@reapit/utils-react', () => ({
  getPlatformHeaders: jest.fn(() => ({})),
}))

const mockedFetch = fetcher as jest.Mock
const mockedFetcherWithRawUrl = fetcherWithRawUrl as jest.Mock
const mockeFetcherWithReturnHeader = fetcherWithReturnHeader as jest.Mock

describe('apps services', () => {
  describe('fetchAppsListAPI', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchAppsListAPI({})).toEqual(stub)
    })
  })

  describe('fetchAppByIdByRawUrl', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetcherWithRawUrl.mockReturnValueOnce(stub)
      expect(await fetchAppByIdByRawUrl('')).toEqual(stub)
    })
  })

  describe('fetchAppById', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchAppById({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('createAppAPI', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockeFetcherWithReturnHeader.mockReturnValueOnce(stub)
      expect(await createAppAPI({})).toEqual(stub)
    })
  })

  describe('deleteAppById', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await deleteAppById({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('featureAppById', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await featureAppById({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('unfeatureAppById', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await unfeatureAppById({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('fetchAppRevisionsList', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchAppRevisionsList({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('createAppRevisionAPI', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await createAppRevisionAPI({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('fetchAppRevisionsById', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchAppRevisionsById({ id: 'SOME_ID', revisionId: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('approveAppRevisionById', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await approveAppRevisionById({ id: 'SOME_ID', revisionId: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('rejectAppRevisionById', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await rejectAppRevisionById({ id: 'SOME_ID', revisionId: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('fetchAppSecretByIdAPI', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchAppSecretByIdAPI({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('fetchDesktopIntegrationTypes', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchDesktopIntegrationTypes()).toEqual(stub)
    })
  })

  describe('fetchAppDetail', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchAppDetail({ id: 'SOME_ID', clientId: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('fetchAppApiKey', () => {
    it('should return a response from the apps service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchAppApiKey({ installationId: 'SOME_ID' })).toEqual(stub)
    })
  })
})
