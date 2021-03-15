import revisionDetailSagas, {
  revisionDetailDataFetch,
  revisionDetailDataListen,
  requestApproveRevisionListen,
  requestDeclineRevisionListen,
  requestApproveRevision,
  requestDeclineRevision,
} from '../revision-detail'

import { revisionDetailDataStub } from '../__stubs__/revision-detail'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import {
  fetchRevisionSuccess,
  fetchRevisionFailed,
  RevisionDetailRequestParams,
  setRequestApproveRevisionFormState,
  RevisionApproveRequestParams,
  RevisionDeclineRequestParams,
  setRequestDeclineRevisionFormState,
} from '@/actions/revision-detail'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { approvalsDataFetch } from '../../approvals/approvals'
import { fetchAppRevisionsById, approveAppRevisionById, rejectAppRevisionById } from '@/services/apps'
import { fetchScopesList } from '@/services/scopes'
import { fetchDesktopIntegrationTypesList } from '@/services/desktop-integration-types'
import { selectApprovalListPageNumber } from '@/selector/approvals'
import { notification } from '@reapit/elements'
import { errorMessages } from '@reapit/utils'

jest.mock('@/services/apps')
jest.mock('@/services/scopes')
jest.mock('@/services/desktop-integration-types')
jest.mock('@reapit/elements')

const params: Action<RevisionDetailRequestParams> = {
  type: 'FETCH_REVISION_SUCCESS',
  data: { appId: '9b6fd5f7-2c15-483d-b925-01b650538e52', appRevisionId: '9b6fd5f7-2c15-483d-b925-01b650538e52' },
}

describe('revision-detail fetch data', () => {
  const gen = cloneableGenerator(revisionDetailDataFetch as any)(params)
  const {
    data: { appId, appRevisionId },
  } = params
  expect(gen.next().value).toEqual(
    all([
      call(fetchAppRevisionsById, { id: appId, revisionId: appRevisionId }),
      call(fetchScopesList),
      call(fetchDesktopIntegrationTypesList, {}),
    ]),
  )

  test('api call success', () => {
    const clone = gen.clone()
    const { data, scopes, desktopIntegrationTypes } = revisionDetailDataStub
    expect(clone.next([data, scopes, desktopIntegrationTypes]).value).toEqual(
      put(fetchRevisionSuccess(revisionDetailDataStub)),
    )
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(
        call(notification.error, {
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      )
      expect(clone.next().value).toEqual(put(fetchRevisionFailed(errorMessages.DEFAULT_SERVER_ERROR)))
      expect(clone.next().done).toBe(true)
    }
  })
})

const pageNumber = 1

const approveSubmitParams: Action<RevisionApproveRequestParams> = {
  data: {
    appId: '9b6fd5f7-2c15-483d-b925-01b650538e52',
    appRevisionId: '9b6fd5f7-2c15-483d-b925-01b650538e52',
    email: 'willmcvay@reapit.com',
    name: 'Will McVay',
  },
  type: 'REQUEST_APPROVE_REVISION',
}

describe('revision approve submmit', () => {
  const gen = cloneableGenerator(requestApproveRevision as any)(approveSubmitParams)
  const { appId, appRevisionId, ...body } = approveSubmitParams.data
  expect(gen.next().value).toEqual(select(selectApprovalListPageNumber))
  expect(gen.next({ pageNumber }).value).toEqual(put(setRequestApproveRevisionFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(call(approveAppRevisionById, { id: appId, revisionId: appRevisionId, ...body }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next({}).value).toEqual(call(approvalsDataFetch, { data: pageNumber }))
    expect(clone.next('SUCCESS').value).toEqual(put(setRequestApproveRevisionFormState('SUCCESS')))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(
        call(notification.error, {
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      )
      expect(clone.next(undefined).value).toEqual(put(setRequestApproveRevisionFormState('ERROR')))
      expect(clone.next().done).toBe(true)
    }
  })
})

const declineSubmitParams: Action<RevisionDeclineRequestParams> = {
  data: {
    appId: '9b6fd5f7-2c15-483d-b925-01b650538e52',
    appRevisionId: '9b6fd5f7-2c15-483d-b925-01b650538e52',
    email: 'willmcvay@reapit.com',
    name: 'Will McVay',
    rejectionReason: 'Typo mistake',
  },
  type: 'REQUEST_DECLINE_REVISION',
}

describe('revision decline submmit', () => {
  const gen = cloneableGenerator(requestDeclineRevision as any)(declineSubmitParams)
  const { appId, appRevisionId, ...body } = declineSubmitParams.data
  expect(gen.next().value).toEqual(select(selectApprovalListPageNumber))
  expect(gen.next({ pageNumber }).value).toEqual(put(setRequestDeclineRevisionFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(call(rejectAppRevisionById, { id: appId, revisionId: appRevisionId, ...body }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next({}).value).toEqual(call(approvalsDataFetch, { data: pageNumber }))
    expect(clone.next('SUCCESS').value).toEqual(put(setRequestDeclineRevisionFormState('SUCCESS')))
    expect(clone.next().done).toBe(true)
  })

  // setRequestDeclineRevisionFormState
  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(
        call(notification.error, {
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      )
      expect(clone.next(undefined).value).toEqual(put(setRequestDeclineRevisionFormState('ERROR')))
      expect(clone.next().done).toBe(true)
    }
  })
})

describe('revision-detail thunks', () => {
  describe('revisionDetailDataListen', () => {
    it('should trigger request data when called', () => {
      const gen = revisionDetailDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<RevisionDetailRequestParams>>(ActionTypes.FETCH_REVISION, revisionDetailDataFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('revisionDetailSagas', () => {
    it('should listen data request', () => {
      const gen = cloneableGenerator(revisionDetailSagas)()

      expect(gen.next().value).toEqual(
        all([fork(revisionDetailDataListen), fork(requestApproveRevisionListen), fork(requestDeclineRevisionListen)]),
      )
      expect(gen.next().done).toBe(true)
    })
  })
})
