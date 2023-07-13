import React from 'react'
import {
  handleDeleteApp,
  handleRefreshAppsDelete,
  handleOpenModal,
  handleAppIdFeatured,
  AppsTable,
  handleAppIdSubs,
  handleAppIdConsumption,
} from '../apps-table'
import { render } from '../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitUpdate: jest.fn(() => [null, false, undefined, jest.fn()]),
  useReapitGet: jest.fn(() => [null, true, undefined, jest.fn()]),
}))
jest.mock('../../../core/use-permissions-state')

describe('AppsTable', () => {
  it('should render component with no apps', () => {
    expect(render(<AppsTable apps={null} appsRefresh={jest.fn()} />)).toMatchSnapshot()
  })

  it('should render component with apps', () => {
    expect(render(<AppsTable apps={mockAppSummaryModelPagedResult} appsRefresh={jest.fn()} />)).toMatchSnapshot()
  })
})

describe('handleDeleteApp', () => {
  it('handleDeleteApp should correctly delete an app', () => {
    const deleteApp = jest.fn()
    const setIndexExpandedRow = jest.fn()
    const appId = 'MOCK_ID'

    const curried = handleDeleteApp(deleteApp, setIndexExpandedRow, appId)

    curried()

    expect(deleteApp).toHaveBeenCalledTimes(1)
    expect(setIndexExpandedRow).toHaveBeenCalledWith(null)
  })
})

describe('handleRefreshAppsDelete', () => {
  it('handleRefreshAppsDelete should correctly refresh apps list', () => {
    const appsRefresh = jest.fn()
    const setAppIdDelete = jest.fn()
    const closeModal = jest.fn()
    const appDeleted = true

    const curried = handleRefreshAppsDelete(appsRefresh, setAppIdDelete, closeModal, appDeleted)

    curried()

    expect(appsRefresh).toHaveBeenCalledTimes(1)
    expect(setAppIdDelete).toHaveBeenCalledWith(null)
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})

describe('handleOpenModal', () => {
  it('handleOpenModal should correctly open a modal', () => {
    const openModal = jest.fn()
    const setAppIdDelete = jest.fn()
    const appIdDelete = 'MOCK_ID'

    const curried = handleOpenModal(openModal, setAppIdDelete, appIdDelete)

    curried()

    expect(openModal).toHaveBeenCalledTimes(1)
    expect(setAppIdDelete).toHaveBeenCalledWith(appIdDelete)
  })
})

describe('handleAppIdFeatured', () => {
  it('handleAppIdFeatured should correctly set an appId', () => {
    const setAppIdFeatured = jest.fn()
    const setAppIdSubs = jest.fn()
    const setAppIdConsumption = jest.fn()
    const appId = 'MOCK_ID'

    const curried = handleAppIdFeatured(setAppIdFeatured, setAppIdSubs, setAppIdConsumption, appId)

    curried()

    expect(setAppIdConsumption).toHaveBeenCalledWith(null)
    expect(setAppIdFeatured).toHaveBeenCalledWith(appId)
    expect(setAppIdSubs).toHaveBeenCalledWith(null)
  })
})

describe('handleAppIdSubs', () => {
  it('handleAppIdSubs should correctly set an appId', () => {
    const setAppIdFeatured = jest.fn()
    const setAppIdSubs = jest.fn()
    const setAppIdConsumption = jest.fn()
    const appId = 'MOCK_ID'

    const curried = handleAppIdSubs(setAppIdSubs, setAppIdFeatured, setAppIdConsumption, appId)

    curried()

    expect(setAppIdConsumption).toHaveBeenCalledWith(null)
    expect(setAppIdFeatured).toHaveBeenCalledWith(null)
    expect(setAppIdSubs).toHaveBeenCalledWith(appId)
  })
})

describe('handleAppIdConsumption', () => {
  it('handleAppIdConsumption should correctly set an appId', () => {
    const setAppIdFeatured = jest.fn()
    const setAppIdSubs = jest.fn()
    const setAppIdConsumption = jest.fn()
    const appId = 'MOCK_ID'

    const curried = handleAppIdConsumption(setAppIdConsumption, setAppIdSubs, setAppIdFeatured, appId)

    curried()

    expect(setAppIdConsumption).toHaveBeenCalledWith(appId)
    expect(setAppIdFeatured).toHaveBeenCalledWith(null)
    expect(setAppIdSubs).toHaveBeenCalledWith(null)
  })
})
