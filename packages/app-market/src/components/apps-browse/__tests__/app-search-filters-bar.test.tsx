// import { useReapitGet } from '@reapit/utils-react'
import React, { ChangeEvent } from 'react'
import { render } from '../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'
import { AppSearchFilters, handleSearch, handleSelectFilter } from '../app-search-filters-bar'
import { MobileControlsToggleState } from '../apps-browse'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockAppSummaryModelPagedResult, false]),
}))

// const mockUseReapitGet = useReapitGet as jest.Mock

describe('AppSearchFilters', () => {
  it('should match a snapshot', () => {
    const props = {
      setMobileControlsState: jest.fn(),
      mobileControlsState: {
        controls: 'filters',
        filters: 'categories',
      } as MobileControlsToggleState,
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
    const curried = handleSelectFilter(appsBrowseFilterState, setAppsBrowseFilterState)

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
    const curried = handleSelectFilter(appsBrowseFilterState, setAppsBrowseFilterState)

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

    expect(newState).toEqual({ appName: 'app_name' })
  })
})
