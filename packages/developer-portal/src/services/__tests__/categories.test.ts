import { fetcher } from '@reapit/utils-common'
import { createCategory, deleteCategoryById, fetchCategoryById, fetchCategoryListAPI } from '../categories'

jest.mock('@reapit/utils-common')
jest.mock('@reapit/utils-react')

const mockedFetch = fetcher as jest.Mock

describe('categories services', () => {
  describe('fetchCategoryListAPI', () => {
    it('should return a response from the categories service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchCategoryListAPI({})).toEqual(stub)
    })
  })

  describe('createCategory', () => {
    it('should return a response from the categories service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await createCategory({})).toEqual(stub)
    })
  })

  describe('fetchCategoryById', () => {
    it('should return a response from the categories service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchCategoryById({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('deleteCategoryById', () => {
    it('should return a response from the categories service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await deleteCategoryById({ id: 'SOME_ID' })).toEqual(stub)
    })
  })
})
