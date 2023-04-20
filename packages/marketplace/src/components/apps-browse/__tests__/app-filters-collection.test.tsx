import React from 'react'
import { render, setViewport, viewPortOptions } from '../../../tests/react-testing'
import { AppFiltersCollection, handleSetFilters } from '../app-filters-collection'
import { handleSortConfigs } from '../apps-browse'
import { appsBrowseConfigCollection } from '../../../core/config'
import { trackEvent } from '../../../core/analytics'
import { TrackingEvent } from '../../../core/analytics-events'
import { mockCategoryModelPagedResult } from '../../../tests/__stubs__/categories'
import { RoutePaths } from '../../../constants/routes'

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
    const navigate = jest.fn()
    const curried = handleSetFilters(
      setAppsBrowseFilterState,
      mockCategoryModelPagedResult.data ?? [],
      navigate,
      configItem,
    )

    curried()

    expect(trackEvent).toHaveBeenCalledWith(TrackingEvent.ClickCollectionsTile, true, {
      filters: configItem.filters,
      collectionTitle: configItem.content?.title,
      collectionId: configItem.id,
    })
    expect(setAppsBrowseFilterState).toHaveBeenCalledWith(configItem.filters)
    expect(navigate).toHaveBeenCalledWith(`${RoutePaths.APPS_BROWSE}?collectionId=${configItem.id}`)
  })
})
