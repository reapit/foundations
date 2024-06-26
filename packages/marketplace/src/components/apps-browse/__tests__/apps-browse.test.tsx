import React from 'react'
import { render, setViewport, viewPortOptions } from '../../../tests/react-testing'
import {
  AppsBrowse,
  checkHasFilters,
  handleClearFilters,
  handleCollectionId,
  handleMobileControls,
  handleSetFilters,
  handleSortConfigs,
  MobileControlsState,
} from '../apps-browse'
import { appsBrowseConfigCollection } from '../../../core/config'
import { useAppsBrowseState } from '../../../core/use-apps-browse-state'
import { mockAppsBrowseState } from '../../../core/__mocks__/use-apps-browse-state'
import { RoutePaths } from '../../../constants/routes'

process.env.clientHiddenAppIds = {}
process.env.orgAdminRestrictedAppIds = []

jest.mock('../../../core/analytics')
jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: {
        clientId: 'MOCK_CLIENT_ID',
        groups: ['OrganisationAdmin'],
      },
    },
  })),
}))

const configItem = handleSortConfigs(appsBrowseConfigCollection)().featuredApps[0]

jest.mock('../../../core/use-apps-browse-state')

const mockUseAppsBrowseState = useAppsBrowseState as jest.Mock

describe('AppsBrowse', () => {
  viewPortOptions.forEach((option) => {
    it(`should match a snapshot for mobile ${option}`, () => {
      setViewport(option)
      expect(render(<AppsBrowse />)).toMatchSnapshot()
    })
  })

  it('should match a snapshot for ', () => {
    setViewport('tablet')
    expect(render(<AppsBrowse />)).toMatchSnapshot()
  })

  it('should match a snapshot with filters', () => {
    mockUseAppsBrowseState.mockReturnValueOnce({
      ...mockAppsBrowseState,
      appsBrowseFilterState: {
        developerId: 'MOCK_DEVELOPER_ID',
      },
    })
    expect(render(<AppsBrowse />)).toMatchSnapshot()
  })
})

describe('handleSortConfigs', () => {
  it('should correctly sort configs', () => {
    const curried = handleSortConfigs(appsBrowseConfigCollection)
    const config = appsBrowseConfigCollection.items

    expect(curried()).toEqual({
      featuredHeroApps: [config[0]],
      heroApps: [config[1], config[2]],
      appsFilters: [config[3], config[4], config[5], config[6], config[7], config[8]],
      featuredApps: [config[9]],
      simpleApps: [config[10]],
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
    const newState = 'filters' as MobileControlsState

    const curried = handleMobileControls(setMobileControlsState, newState)

    curried()

    expect(setMobileControlsState).toHaveBeenCalledWith(newState)
  })
})

describe('handleSetFilters', () => {
  it('should set filters', () => {
    const setAppsBrowseFilterState = jest.fn()
    const navigate = jest.fn()
    const curried = handleSetFilters(setAppsBrowseFilterState, navigate, configItem)

    curried()

    expect(setAppsBrowseFilterState).toHaveBeenCalledWith(configItem.filters)
    expect(navigate).toHaveBeenCalledWith(`${RoutePaths.APPS_BROWSE}?collectionId=${configItem.id}`)
  })
})

describe('handleCollectionId', () => {
  it('should set filters from an id', () => {
    const setAppsBrowseFilterState = jest.fn()
    const appsBrowseConfigState = mockAppsBrowseState.appsBrowseConfigState
    const collectionId = appsBrowseConfigState.items[0].id ?? null
    const curried = handleCollectionId(setAppsBrowseFilterState, appsBrowseConfigState, collectionId)

    curried()

    expect(setAppsBrowseFilterState).toHaveBeenCalledWith(appsBrowseConfigState.items[0].filters)
  })
})

describe('handleClearFilters', () => {
  it('should set the filters to null', () => {
    const setAppsBrowseFilterState = jest.fn()
    const curried = handleClearFilters(setAppsBrowseFilterState)

    curried()

    expect(setAppsBrowseFilterState).toHaveBeenCalledWith(null)
  })
})
