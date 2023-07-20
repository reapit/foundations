import { ReapitConnectSession } from '@reapit/connect-session'
import { AppRevisionModel, AppRevisionModelPagedResult } from '@reapit/foundations-ts-definitions'
import React, { MouseEvent } from 'react'
import Routes from '../../../../constants/routes'
import { render } from '../../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../../tests/__stubs__/apps'
import { defaultAppSavingParams } from '../../state/defaults'
import { useAppState } from '../../state/use-app-state'
import { mockAppState } from '../../state/__mocks__/use-app-state'
import {
  handleCancelPendingRevsion,
  handleCancelSuccess,
  handleDeleteApp,
  handleOpenModal,
  handleRefreshApps,
  handleSetAppEditSaving,
  handleSetRevisionId,
  Helper,
} from '../helper'

jest.mock('../../state/use-app-state')
jest.mock('../../../../core/use-global-state')

const mockUseAppState = useAppState as jest.Mock

describe('Helper', () => {
  it('should match a snapshot', () => {
    expect(render(<Helper />)).toMatchSnapshot()
  })

  it('should match a snapshot for the appsEdit page', () => {
    window.location.pathname = `${Routes.APPS}/mock-id/edit`
    expect(render(<Helper />)).toMatchSnapshot()
  })

  it('should match a snapshot for the appsEdit page where isListed', () => {
    window.location.pathname = `${Routes.APPS}/mock-id/edit`

    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        ...mockAppState.appsDataState,
        appDetail: {
          isListed: true,
        },
      },
    })

    expect(render(<Helper />)).toMatchSnapshot()
  })

  it('should match a snapshot for the appsEdit page where is completed and not publically listed', () => {
    window.location.pathname = `${Routes.APPS}/mock-id/edit`

    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        ...mockAppState.appsDataState,
        appDetail: {
          isListed: false,
        },
      },
    })

    expect(render(<Helper />)).toMatchSnapshot()
  })

  it('should match a snapshot for the appsEdit page where has unsaved changes', () => {
    window.location.pathname = `${Routes.APPS}/mock-id/edit`

    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        ...mockAppState.appsDataState,
        appDetail: {
          isListed: true,
        },
      },
      appEditState: {
        ...mockAppState.appEditState,
        appUnsavedFields: { name: true },
      },
    })

    expect(render(<Helper />)).toMatchSnapshot()
  })

  it('should match a snapshot for the appsEdit page where has unsaved changes and not listed', () => {
    window.location.pathname = `${Routes.APPS}/mock-id/edit`

    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        appDetail: {},
      },
      appEditState: {
        ...mockAppState.appEditState,
        appIncompleteFields: ['name'],
        appUnsavedFields: { name: true },
      },
    })

    expect(render(<Helper />)).toMatchSnapshot()
  })

  it('should match a snapshot for the appsEdit page where the app is loading', () => {
    window.location.pathname = `${Routes.APPS}/mock-id/edit`

    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        appDetail: {},
        appDetailLoading: true,
      },
    })

    expect(render(<Helper />)).toMatchSnapshot()
  })

  it('should match a snapshot for the appsDetail page', () => {
    window.location.pathname = `${Routes.APPS}/mock-id`
    expect(render(<Helper />)).toMatchSnapshot()
  })

  it('should match a snapshot for the consents page', () => {
    window.location.pathname = `${Routes.APPS}/mock-id/consents`
    expect(render(<Helper />)).toMatchSnapshot()
  })

  it('should match a snapshot for the pipelines page', () => {
    window.location.pathname = `${Routes.APPS}/mock-id/pipeline`
    expect(render(<Helper />)).toMatchSnapshot()
  })
})

describe('handleSetAppEditSaving', () => {
  it('should handle app saving where developer status is confirmed', () => {
    const setAppEditSaving = jest.fn()
    const isListed = true
    const openModal = jest.fn()
    const curried = handleSetAppEditSaving(setAppEditSaving, isListed, openModal, 'confirmed')

    curried()

    expect(setAppEditSaving).toHaveBeenCalledWith({
      ...defaultAppSavingParams,
      isRevalidating: true,
      isListed,
    })

    expect(openModal).not.toHaveBeenCalled()
  })

  it('should handle app saving where developer status is unconfirmed but listing is false', () => {
    const setAppEditSaving = jest.fn()
    const isListed = false
    const openModal = jest.fn()
    const curried = handleSetAppEditSaving(setAppEditSaving, isListed, openModal, 'unconfirmed')

    curried()

    expect(setAppEditSaving).toHaveBeenCalledWith({
      ...defaultAppSavingParams,
      isRevalidating: true,
      isListed,
    })

    expect(openModal).not.toHaveBeenCalled()
  })

  it('should handle app saving where developer status is unconfirmed and listing is true', () => {
    const setAppEditSaving = jest.fn()
    const isListed = true
    const openModal = jest.fn()
    const curried = handleSetAppEditSaving(setAppEditSaving, isListed, openModal, 'unconfirmed')

    curried()

    expect(setAppEditSaving).toHaveBeenCalledWith({
      ...defaultAppSavingParams,
      isRevalidating: true,
      isListed: false,
    })

    expect(openModal).toHaveBeenCalledTimes(1)
  })
})

describe('handleCancelPendingRevsion', () => {
  it('should handle app cancelling a pending revision', () => {
    const cancelRevision = jest.fn()
    const connectSession = {
      loginIdentity: {
        name: 'MOCK_NAME',
        email: 'MOCK_EMAIL',
      },
    } as ReapitConnectSession
    const revisionId = 'MOCK_ID'
    const curried = handleCancelPendingRevsion(cancelRevision, connectSession, revisionId)

    curried()

    expect(cancelRevision).toHaveBeenCalledWith({
      name: connectSession.loginIdentity.name,
      email: connectSession.loginIdentity.email,
      rejectionReason: 'Cancelled by developer',
      rejectedByDeveloper: true,
    })
  })
})

describe('handleSetRevisionId', () => {
  it('should handle app saving', () => {
    const appRevisions = mockAppSummaryModelPagedResult as AppRevisionModelPagedResult
    const setRevisionId = jest.fn()
    const curried = handleSetRevisionId(appRevisions, setRevisionId)

    curried()

    expect(setRevisionId).toHaveBeenCalledWith((appRevisions.data as AppRevisionModel[])[0].id)
  })
})

describe('handleCancelSuccess', () => {
  it('should handle app saving', () => {
    const appsDetailRefresh = jest.fn()
    const setRevisionId = jest.fn()
    const appRefreshRevisions = jest.fn()
    const curried = handleCancelSuccess(appsDetailRefresh, setRevisionId, appRefreshRevisions, true)

    curried()

    expect(appsDetailRefresh).toHaveBeenCalledTimes(1)
    expect(appRefreshRevisions).toHaveBeenCalledTimes(1)
    expect(setRevisionId).toHaveBeenCalledWith(null)
  })

  it('should handle refresh apps', () => {
    const appDeleted = true
    const refreshApps = jest.fn()
    const closeModal = jest.fn()

    const curried = handleRefreshApps(refreshApps, closeModal, appDeleted)

    curried()

    expect(refreshApps).toHaveBeenCalledTimes(1)
    expect(closeModal).toHaveBeenCalledTimes(1)
  })

  it('should handle delete apps', async () => {
    const event = {
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent
    const deleteApps = jest.fn(() => Promise.resolve(true))
    const navigate = jest.fn()

    const curried = handleDeleteApp(deleteApps, navigate)

    await curried(event)

    expect(deleteApps).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(Routes.APPS)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })

  it('should handle opening modal', () => {
    const event = {
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent
    const openModal = jest.fn()

    const curried = handleOpenModal(openModal)

    curried(event)

    expect(openModal).toHaveBeenCalledTimes(1)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })
})
