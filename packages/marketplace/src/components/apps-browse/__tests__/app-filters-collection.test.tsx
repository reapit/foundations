import React from 'react'
import { render, setViewport, viewPortOptions } from '../../../tests/react-testing'
import { AppFiltersCollection, handleSetFilters } from '../app-filters-collection'
import { handleSortConfigs } from '../apps-browse'
import { appsBrowseConfigCollection } from '../../../core/config'
import { trackEvent } from '../../../core/analytics'
import { TrackingEvent } from '../../../core/analytics-events'
import { mockCategoryModelPagedResult } from '../../../tests/__stubs__/categories'
import { History } from 'history'
import { Routes } from '../../../constants/routes'

const configItem = handleSortConfigs(appsBrowseConfigCollection)().appsFilters[0]

jest.mock('../../../core/use-apps-browse-state')
jest.mock('../../../core/analytics')

describe('AppFiltersCollection', () => {
  viewPortOptions.forEach((option) => {
    it(`should match a snapshot for mobile ${option}`, () => {
      setViewport(option)
      expect(render(<AppFiltersCollection configItem={configItem} />)).toMatchSnapshot()
    })
  })
})

describe('handleSetFilters', () => {
  it('should set filters', () => {
    const setAppsBrowseFilterState = jest.fn()
    const history = {
      push: jest.fn(),
    } as unknown as History
    const curried = handleSetFilters(
      setAppsBrowseFilterState,
      mockCategoryModelPagedResult.data ?? [],
      history,
      configItem,
    )

    curried()

    expect(trackEvent).toHaveBeenCalledWith(TrackingEvent.ClickFiltersTile, true, { filters: configItem.filters })
    expect(setAppsBrowseFilterState).toHaveBeenCalledWith(configItem.filters)
    expect(history.push).toHaveBeenCalledWith(`${Routes.APPS_BROWSE}?collectionId=${configItem.id}`)
  })
})
