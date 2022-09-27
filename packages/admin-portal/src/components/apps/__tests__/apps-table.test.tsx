import React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import {
  handleDeleteApp,
  handleRefreshAppsDelete,
  handleRefreshAppsFeatured,
  handleOpenModal,
  handleToggleFeatured,
  handleAppIdFeatured,
  AppsTable,
} from '../apps-table'
import { render } from '../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'

jest.mock('@reapit/utils-react', () => ({
  useReapitUpdate: jest.fn(() => [null, false, undefined, jest.fn()]),
  useReapitGet: jest.fn(() => [null, true, undefined, jest.fn()]),
  objectToQuery: jest.fn(),
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

describe('handleRefreshAppsFeatured', () => {
  it('handleRefreshAppsFeatured should correctly refresh featured apps', () => {
    const appsRefresh = jest.fn()
    const setAppIdFeatured = jest.fn()
    const shouldRefresh = true

    const curried = handleRefreshAppsFeatured(appsRefresh, setAppIdFeatured, shouldRefresh)

    curried()

    expect(appsRefresh).toHaveBeenCalledTimes(1)
    expect(setAppIdFeatured).toHaveBeenCalledWith(null)
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

describe('handleToggleFeatured', () => {
  it('handleToggleFeatured should correctly toggle an app as featured', () => {
    const featureApp = jest.fn()
    const unFeatureApp = jest.fn()
    const apps = mockAppSummaryModelPagedResult
    const appIdFeatured = 'MOCK_ID'

    const curried = handleToggleFeatured(featureApp, unFeatureApp, apps, appIdFeatured)

    curried()

    expect(featureApp).toHaveBeenCalledTimes(1)
    expect(unFeatureApp).not.toHaveBeenCalled()
  })

  it('handleToggleFeatured should correctly toggle an app as unfeatured', () => {
    const app = (mockAppSummaryModelPagedResult.data as AppSummaryModel[])[0]
    const featureApp = jest.fn()
    const unFeatureApp = jest.fn()
    const apps = {
      ...mockAppSummaryModelPagedResult,
      data: [{ ...app, isFeatured: true }],
    }
    const appIdFeatured = app.id as string

    const curried = handleToggleFeatured(featureApp, unFeatureApp, apps, appIdFeatured)

    curried()

    expect(featureApp).not.toHaveBeenCalled()
    expect(unFeatureApp).toHaveBeenCalledTimes(1)
  })
})

describe('handleAppIdFeatured', () => {
  it('handleAppIdFeatured should correctly set an appId', () => {
    const setAppIdFeatured = jest.fn()
    const appId = 'MOCK_ID'

    const curried = handleAppIdFeatured(setAppIdFeatured, appId)

    curried()

    expect(setAppIdFeatured).toHaveBeenCalledWith(appId)
  })
})
