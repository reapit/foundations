import React, { ChangeEvent, MutableRefObject } from 'react'
import { useAppsBrowseState } from '../../../core/use-apps-browse-state'
import { mockAppsBrowseState } from '../../../core/__mocks__/use-apps-browse-state'
import { render } from '../../../tests/react-testing'
import { mockCategoryModelPagedResult } from '../../../tests/__stubs__/categories'
import { AppSearchFilters, handleClearSearch, handleSearch, handleSelectFilter } from '../app-search-filters-bar'
import { MobileControlsState } from '../apps-browse'

jest.mock('../../../core/use-apps-browse-state')
jest.mock('../../../core/analytics')

const mockUseAppsBrowseState = useAppsBrowseState as jest.Mock

describe('AppSearchFilters', () => {
  it('should match a snapshot', () => {
    const props = {
      setMobileControlsState: jest.fn(),
      mobileControlsState: 'filters' as MobileControlsState,
    }
    expect(render(<AppSearchFilters {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot where has search', () => {
    mockUseAppsBrowseState.mockReturnValueOnce({
      ...mockAppsBrowseState,
      appsBrowseFilterState: {
        searchTerm: 'MOCK_DEVELOPER_NAME',
      },
    })

    const props = {
      setMobileControlsState: jest.fn(),
      mobileControlsState: 'search' as MobileControlsState,
    }
    expect(render(<AppSearchFilters {...props} />)).toMatchSnapshot()
  })
})

describe('handleSelectFilter', () => {
  it('should set filters where the category is already selected', () => {
    const appsBrowseFilterState = {
      category: ['CAT_ID_1'],
    }
    const event = {
      target: {
        value: 'CAT_ID_1',
      },
    } as unknown as ChangeEvent<HTMLInputElement>
    const setAppsBrowseFilterState = jest.fn()
    const curried = handleSelectFilter(appsBrowseFilterState, setAppsBrowseFilterState, mockCategoryModelPagedResult)

    curried(event)

    expect(setAppsBrowseFilterState).toHaveBeenCalledWith({ category: [] })
  })

  it('should set filters where a new category is added', () => {
    const appsBrowseFilterState = {
      category: ['CAT_ID_1'],
    }
    const event = {
      target: {
        value: 'CAT_ID_2',
      },
    } as unknown as ChangeEvent<HTMLInputElement>
    const setAppsBrowseFilterState = jest.fn()
    const curried = handleSelectFilter(appsBrowseFilterState, setAppsBrowseFilterState, mockCategoryModelPagedResult)

    curried(event)

    expect(setAppsBrowseFilterState).toHaveBeenCalledWith({ category: ['CAT_ID_1', 'CAT_ID_2'] })
  })
})

describe('handleSearch', () => {
  it('should set a search term', () => {
    const event = {
      target: {
        value: 'APP_NAME',
      },
    } as unknown as ChangeEvent<HTMLInputElement>
    const setAppsBrowseFilterState = jest.fn()
    const curried = handleSearch(setAppsBrowseFilterState)

    curried(event)

    const newState = setAppsBrowseFilterState.mock.calls[0][0]({})

    expect(newState).toEqual({ searchTerm: 'app_name' })
  })

  it('should not set a search term if an empty string', () => {
    const event = {
      target: {
        value: '',
      },
    } as unknown as ChangeEvent<HTMLInputElement>
    const setAppsBrowseFilterState = jest.fn()
    const curried = handleSearch(setAppsBrowseFilterState)

    curried(event)

    const newState = setAppsBrowseFilterState.mock.calls[0][0]({})

    expect(newState).toEqual({})
  })
})

describe('handleClearSearch', () => {
  it('should clear the search box and set the filters to null', () => {
    const setAppsBrowseFilterState = jest.fn()
    const searchRef = {
      current: {
        value: 'FOO',
      },
    } as unknown as MutableRefObject<HTMLInputElement | null>
    const curried = handleClearSearch(setAppsBrowseFilterState, searchRef)

    curried()

    expect(setAppsBrowseFilterState).toHaveBeenCalledWith(null)
    expect(searchRef.current?.value).toEqual('')
  })
})
