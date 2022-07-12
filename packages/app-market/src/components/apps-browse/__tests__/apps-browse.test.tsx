import React from 'react'
import { render } from '../../../tests/react-testing'
import {
  AppsBrowse,
  checkHasFilters,
  handleMobileControls,
  handleSortConfigs,
  MobileControlsToggleState,
} from '../apps-browse'
import { appsBrowseConfigCollection } from '../../../core/config'

describe('AppsBrowse', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsBrowse />)).toMatchSnapshot()
  })
})

describe('handleSortConfigs', () => {
  it('should correctly sort configs', () => {
    const curried = handleSortConfigs(appsBrowseConfigCollection)
    const config = appsBrowseConfigCollection.data

    expect(curried()).toEqual({
      featuredHeroApps: [config[0]],
      heroApps: [config[1], config[2]],
      appsFilters: [config[3]],
      featuredApps: [config[4]],
      simpleApps: [config[5]],
    })
  })
})

describe('checkHasFilters', () => {
  it('should check if there are filters as an array', () => {
    const appsBrowseFilterState = {
      desktopIntegrationTypeId: ['type1'],
    }
    const curried = checkHasFilters(appsBrowseFilterState)

    const result = curried()

    expect(result).toBe(true)
  })

  it('should check if there are filters as a string', () => {
    const appsBrowseFilterState = {
      developerId: 'MOCK_ID',
    }
    const curried = checkHasFilters(appsBrowseFilterState)

    const result = curried()

    expect(result).toBe(true)
  })

  it('should check if there are no filters', () => {
    const curried = checkHasFilters(null)

    const result = curried()

    expect(result).toBe(false)
  })
})

describe('handleMobileControls', () => {
  it('should set controls if there are none in state', () => {
    const setMobileControlsState = jest.fn()
    const newState = {
      controls: 'filters',
      filters: 'categories',
    } as MobileControlsToggleState

    const curried = handleMobileControls(setMobileControlsState, newState)

    curried()

    const setStateAction = setMobileControlsState.mock.calls[0][0]

    const actualState = setStateAction({ controls: 'none', filters: 'none' })

    expect(actualState).toEqual(newState)
  })

  it('should not update controls if the current state is equal to new state', () => {
    const setMobileControlsState = jest.fn()
    const newState = {
      controls: 'filters',
      filters: 'categories',
    } as MobileControlsToggleState

    const curried = handleMobileControls(setMobileControlsState, newState)

    curried()

    const setStateAction = setMobileControlsState.mock.calls[0][0]

    const actualState = setStateAction(newState)

    expect(actualState).toEqual(newState)
  })
})
