import React from 'react'
import { render, setViewport, viewPortOptions } from '../../../tests/react-testing'
import { AppFiltersCollection, handleSetFilters } from '../app-filters-collection'
import { handleSortConfigs } from '../apps-browse'
import { appsBrowseConfigCollection } from '../../../core/config'

const configItem = handleSortConfigs(appsBrowseConfigCollection)().appsFilters[0]

jest.mock('../../../core/use-apps-browse-state')

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
    const curried = handleSetFilters(setAppsBrowseFilterState, configItem.filters)

    curried()

    expect(setAppsBrowseFilterState).toHaveBeenCalledWith(configItem.filters)
  })
})
