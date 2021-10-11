import { fetcher } from '@reapit/utils-common'
import {
  createInstallation,
  deleteApiKeyInstallationById,
  fetchApiKeyInstallationById,
  fetchInstallationById,
  fetchInstallationsList,
  removeAccessToAppById,
} from '../installations'

jest.mock('@reapit/utils-common')
jest.mock('@reapit/utils-react', () => ({
  getPlatformHeaders: jest.fn(() => ({})),
}))

const mockedFetch = fetcher as jest.Mock

describe('installations services', () => {
  describe('fetchInstallationsList', () => {
    it('should return a response from the installations service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchInstallationsList({})).toEqual(stub)
    })
  })

  describe('createInstallation', () => {
    it('should return a response from the installations service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await createInstallation({ callback: jest.fn() })).toEqual(stub)
    })
  })

  describe('fetchInstallationById', () => {
    it('should return a response from the installations service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchInstallationById({ installationId: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('fetchApiKeyInstallationById', () => {
    it('should return a response from the installations service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchApiKeyInstallationById({ installationId: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('deleteApiKeyInstallationById', () => {
    it('should return a response from the installations service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await deleteApiKeyInstallationById({ installationId: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('removeAccessToAppById', () => {
    it('should return a response from the installations service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await removeAccessToAppById({ installationId: 'SOME_ID', callback: jest.fn() })).toEqual(stub)
    })
  })
})
