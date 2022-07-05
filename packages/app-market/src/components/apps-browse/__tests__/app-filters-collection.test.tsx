import React from 'react'
import { render } from '../../../tests/react-testing'
import { AppFiltersCollection, handleSetFilters } from '../app-filters-collection'
import { handleSortConfigs } from '../apps-browse'
import { appsBrowseConfigCollection } from '../config'

const configItem = handleSortConfigs(appsBrowseConfigCollection)().appsFilters[0]

describe('AppFiltersCollection', () => {
  it('should match a snapshot', () => {
    expect(render(<AppFiltersCollection configItem={configItem} />)).toMatchSnapshot()
  })
})

describe('handleSetFilters', () => {
  it('should set filters', () => {
    const setAppsBrowseFilterState = jest.fn()
    const curried = handleSetFilters(setAppsBrowseFilterState, configItem.filters)

    curried()

    expect(setAppsBrowseFilterState).toHaveBeenCalledWith(configItem.filters)
  })
})
