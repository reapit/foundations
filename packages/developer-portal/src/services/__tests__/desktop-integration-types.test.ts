import { fetcher } from '@reapit/utils-common'
import {
  createDesktopIntegrationTypes,
  updateDesktopIntegrationTypesById,
  fetchDesktopIntegrationTypesById,
  fetchDesktopIntegrationTypeListAPI,
} from '../desktop-integration-types'

jest.mock('@reapit/utils-common')
jest.mock('@reapit/utils-react')

const mockedFetch = fetcher as jest.Mock

describe('desktop integration types services', () => {
  describe('fetchDesktopIntegrationTypeListAPI', () => {
    it('should return a response from the desktop integration types service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchDesktopIntegrationTypeListAPI({})).toEqual(stub)
    })
  })

  describe('createDesktopIntegrationTypes', () => {
    it('should return a response from the desktop integration types service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await createDesktopIntegrationTypes({})).toEqual(stub)
    })
  })

  describe('fetchDesktopIntegrationTypesById', () => {
    it('should return a response from the desktop integration types service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchDesktopIntegrationTypesById({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('updateDesktopIntegrationTypesById', () => {
    it('should return a response from the desktop integration types service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await updateDesktopIntegrationTypesById({ id: 'SOME_ID' })).toEqual(stub)
    })
  })
})
