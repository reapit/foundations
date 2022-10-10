import { mockCategoryModelPagedResult } from '../../tests/__stubs__/categories'
import { mockUserModel } from '../../tests/__stubs__/user'
import { appsBrowseConfigCollection } from '../config'

export const mockAppsBrowseState = {
  appsBrowseDataState: {},
  appsBrowseFilterState: null,
  appsBrowseConfigState: appsBrowseConfigCollection,
  appsBrowseCategoriesState: mockCategoryModelPagedResult.data,
  currentUserState: mockUserModel,
  refreshCurrentUser: jest.fn(),
  setAppsBrowseFilterState: jest.fn(),
}

export const useAppsBrowseState = jest.fn(() => mockAppsBrowseState)
