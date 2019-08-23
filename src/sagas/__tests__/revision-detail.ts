import revisionDetailSagas, {
  revisionDetailDataFetch,
  revisionDetailDataListen,
  approveRevisionListen,
  declineRevisionListen,
  approveRevision,
  declineRevision,
  getApprovalPageNumber
} from '../revision-detail'
import { revisionDetailDataStub } from '../__stubs__/revision-detail'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import {
  revisionDetailLoading,
  revisionDetailReceiveData,
  revisionDetailFailure,
  RevisionDetailRequestParams,
  approveRevisionSetFormState,
  RevisionApproveRequestParams,
  RevisionDeclineRequestParams,
  declineRevisionSetFormState
} from '@/actions/revision-detail'
import { Action } from '@/types/core'
import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { REAPIT_API_BASE_URL } from '../../constants/api'
import { adminApprovalsDataFetch } from '../admin-approvals'

jest.mock('@reapit/elements')

const params: Action<RevisionDetailRequestParams> = {
  type: 'REVISION_DETAIL_RECEIVE_DATA',
  data: { appId: '9b6fd5f7-2c15-483d-b925-01b650538e52', appRevisionId: '9b6fd5f7-2c15-483d-b925-01b650538e52' }
}

describe('revision-detail fetch data', () => {
  const gen = cloneableGenerator(revisionDetailDataFetch)(params)
  expect(gen.next().value).toEqual(put(revisionDetailLoading(true)))
  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: `${URLS.apps}/${params.data.appId}/revisions/${params.data.appRevisionId}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })
  )

  expect(gen.next(revisionDetailDataStub.data).value).toEqual(
    call(fetcher, {
      url: `${URLS.scopes}`,
      method: 'GET',
      api: REAPIT_API_BASE_URL,
      headers: MARKETPLACE_HEADERS
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(revisionDetailDataStub.scopes).value).toEqual(
      put(revisionDetailReceiveData(revisionDetailDataStub))
    )
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(undefined).value).toEqual(put(revisionDetailFailure()))
    expect(clone.next().done).toBe(true)
  })
})

const pageNumber = 1

const approveSubmitParams: Action<RevisionApproveRequestParams> = {
  data: {
    appId: '9b6fd5f7-2c15-483d-b925-01b650538e52',
    appRevisionId: '9b6fd5f7-2c15-483d-b925-01b650538e52',
    email: 'willmcvay@reapit.com',
    name: 'Will McVay'
  },
  type: 'REVISION_SUBMIT_APPROVE'
}

describe('revision approve submmit', () => {
  const gen = cloneableGenerator(approveRevision)(approveSubmitParams)
  const { appId, appRevisionId, ...body } = approveSubmitParams.data
  expect(gen.next().value).toEqual(select(getApprovalPageNumber))
  expect(gen.next({ pageNumber }).value).toEqual(put(approveRevisionSetFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: `${URLS.apps}/${appId}/revisions/${appRevisionId}/approve`,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      headers: MARKETPLACE_HEADERS,
      body
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next({}).value).toEqual(call(adminApprovalsDataFetch, { data: pageNumber }))
    expect(clone.next('SUCCESS').value).toEqual(put(approveRevisionSetFormState('SUCCESS')))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(undefined).value).toEqual(put(approveRevisionSetFormState('ERROR')))
    expect(clone.next().done).toBe(true)
  })
})

const declineSubmitParams: Action<RevisionDeclineRequestParams> = {
  data: {
    appId: '9b6fd5f7-2c15-483d-b925-01b650538e52',
    appRevisionId: '9b6fd5f7-2c15-483d-b925-01b650538e52',
    email: 'willmcvay@reapit.com',
    name: 'Will McVay',
    rejectionReason: 'Typo mistake'
  },
  type: 'REVISION_SUBMIT_DECLINE'
}

describe('revision decline submmit', () => {
  const gen = cloneableGenerator(declineRevision)(declineSubmitParams)
  const { appId, appRevisionId, ...body } = declineSubmitParams.data
  expect(gen.next().value).toEqual(select(getApprovalPageNumber))
  expect(gen.next({ pageNumber }).value).toEqual(put(declineRevisionSetFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: `${URLS.apps}/${appId}/revisions/${appRevisionId}/reject`,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      headers: MARKETPLACE_HEADERS,
      body
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next({}).value).toEqual(call(adminApprovalsDataFetch, { data: pageNumber }))
    expect(clone.next('SUCCESS').value).toEqual(put(declineRevisionSetFormState('SUCCESS')))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(undefined).value).toEqual(put(declineRevisionSetFormState('ERROR')))
    expect(clone.next().done).toBe(true)
  })
})

describe('revision-detail thunks', () => {
  describe('revisionDetailDataListen', () => {
    it('should trigger request data when called', () => {
      const gen = revisionDetailDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<RevisionDetailRequestParams>>(
          ActionTypes.REVISION_DETAIL_REQUEST_DATA,
          revisionDetailDataFetch
        )
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('revisionDetailSagas', () => {
    it('should listen data request', () => {
      const gen = revisionDetailSagas()

      expect(gen.next().value).toEqual(
        all([fork(revisionDetailDataListen), fork(approveRevisionListen), fork(declineRevisionListen)])
      )
      expect(gen.next().done).toBe(true)
    })
  })
})
