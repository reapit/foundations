import React from 'react'
import { render, setViewport, viewPortOptions } from '../../../tests/react-testing'
import { AppFiltersCollection, handleSetFilters } from '../app-filters-collection'
import { handleSortConfigs } from '../apps-browse'
import { appsBrowseConfigCollection } from '../../../core/config'
import { trackEvent } from '../../../core/analytics'
import { TrackingEvent } from '../../../core/analytics-events'
import { mockCategoryModelPagedResult } from '../../../tests/__stubs__/categories'

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
    const curried = handleSetFilters(setAppsBrowseFilterState, mockCategoryModelPagedResult, configItem.filters)

    curried()

    expect(trackEvent).toHaveBeenCalledWith(TrackingEvent.ClickFiltersTile, true, { filters: configItem.filters })
    expect(setAppsBrowseFilterState).toHaveBeenCalledWith(configItem.filters)
  })
})
