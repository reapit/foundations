import { ReapitConnectSession } from '@reapit/connect-session'
import { AppRevisionModel, AppRevisionModelPagedResult } from '@reapit/foundations-ts-definitions'
import React from 'react'
import { Router } from 'react-router-dom'
import Routes from '../../../../../constants/routes'
import { history } from '../../../../../core/router'
import { render } from '../../../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../../../tests/__stubs__/apps'
import { useAppState } from '../../state/use-app-state'
import { mockAppState } from '../../state/__mocks__/use-app-state'
import {
  handleCancelPendingRevsion,
  handleCancelSuccess,
  handleSetAppEditSaving,
  handleSetRevisionId,
  Helper,
} from '../helper'

jest.mock('../../state/use-app-state')

const mockUseAppState = useAppState as jest.Mock

describe('Helper', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <Router history={history}>
          <Helper />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the appsEdit page', () => {
    history.push(`${Routes.APPS}/mock-id/edit`)
    expect(
      render(
        <Router history={history}>
          <Helper />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the appsEdit page where isListed', () => {
    history.push(`${Routes.APPS}/mock-id/edit`)

    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        ...mockAppState.appsDataState,
        appDetail: {
          isListed: true,
        },
      },
    })

    expect(
      render(
        <Router history={history}>
          <Helper />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the appsEdit page where is completed and not publically listed', () => {
    history.push(`${Routes.APPS}/mock-id/edit`)

    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        ...mockAppState.appsDataState,
        appDetail: {
          isListed: false,
        },
      },
    })

    expect(
      render(
        <Router history={history}>
          <Helper />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the appsEdit page where has unsaved changes', () => {
    history.push(`${Routes.APPS}/mock-id/edit`)

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

    expect(
      render(
        <Router history={history}>
          <Helper />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the appsEdit page where has unsaved changes and not listed', () => {
    history.push(`${Routes.APPS}/mock-id/edit`)

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

    expect(
      render(
        <Router history={history}>
          <Helper />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the appsEdit page where the app is loading', () => {
    history.push(`${Routes.APPS}/mock-id/edit`)

    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        appDetail: {},
        appDetailLoading: true,
      },
    })

    expect(
      render(
        <Router history={history}>
          <Helper />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the appsDetail page', () => {
    history.push(`${Routes.APPS}/mock-id`)
    expect(
      render(
        <Router history={history}>
          <Helper />
        </Router>,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleSetAppEditSaving', () => {
  it('should handle app saving', () => {
    const setAppEditSaving = jest.fn()
    const appSavingParams = {
      isListed: true,
      isRevalidating: true,
      isSaving: false,
    }
    const curried = handleSetAppEditSaving(setAppEditSaving, appSavingParams)

    curried()

    expect(setAppEditSaving).toHaveBeenCalledWith(appSavingParams)
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
})
