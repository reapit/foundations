import { mockCategoryModelPagedResult } from '../../tests/__stubs__/categories'
import { appsBrowseConfigCollection } from '../config'

export const mockAppsBrowseState = {
  appsBrowseDataState: {},
  appsBrowseFilterState: null,
  appsBrowseConfigState: appsBrowseConfigCollection,
  appsBrowseCategoriesState: mockCategoryModelPagedResult,
  setAppsBrowseFilterState: jest.fn(),
}

export const useAppsBrowseState = jest.fn(() => mockAppsBrowseState)
