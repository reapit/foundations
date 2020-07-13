import revisionDetailSagas, {
  revisionDetailDataFetch,
  revisionDetailDataListen,
  declineRevision,
  declineRevisionListen,
} from '../revision-detail'
import { revisionDetailDataStub } from '../__stubs__/revision-detail'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, call } from '@redux-saga/core/effects'
import {
  revisionDetailLoading,
  revisionDetailReceiveData,
  revisionDetailFailure,
  RevisionDetailRequestParams,
  RevisionDeclineRequestParams,
  declineRevisionSetFormState,
} from '@/actions/revision-detail'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetchAppRevisionsById, rejectAppRevisionById } from '@/services/apps'
import { fetchScopesList } from '@/services/scopes'
import { fetchDesktopIntegrationTypesList } from '@/services/desktop-integration-types'
import { fork } from 'redux-saga/effects'

jest.mock('@/services/apps')
jest.mock('@/services/scopes')
jest.mock('@/services/desktop-integration-types')
jest.mock('@reapit/elements')

const params: Action<RevisionDetailRequestParams> = {
  type: 'REVISION_DETAIL_RECEIVE_DATA',
  data: { appId: '9b6fd5f7-2c15-483d-b925-01b650538e52', appRevisionId: '9b6fd5f7-2c15-483d-b925-01b650538e52' },
}

describe('revision-detail fetch data', () => {
  const gen = cloneableGenerator(revisionDetailDataFetch as any)(params)
  const {
    data: { appId, appRevisionId },
  } = params
  expect(gen.next().value).toEqual(put(revisionDetailLoading(true)))
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
      put(revisionDetailReceiveData(revisionDetailDataStub)),
    )
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next([undefined, undefined, undefined]).value).toEqual(put(revisionDetailFailure()))
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
          revisionDetailDataFetch,
        ),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('revisionDetailSagas', () => {
    it('should listen data request', () => {
      const gen = cloneableGenerator(revisionDetailSagas)()
      expect(gen.next().value).toEqual(all([fork(revisionDetailDataListen), fork(declineRevisionListen)]))
      expect(gen.next().done).toBe(true)
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
    type: 'REVISION_SUBMIT_DECLINE',
  }

  describe('revision decline submmit', () => {
    const gen = cloneableGenerator(declineRevision as any)(declineSubmitParams)
    const { appId, appRevisionId, ...body } = declineSubmitParams.data
    expect(gen.next('SUBMITTING').value).toEqual(put(declineRevisionSetFormState('SUBMITTING')))
    expect(gen.next().value).toEqual(call(rejectAppRevisionById, { id: appId, revisionId: appRevisionId, ...body }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next('SUCCESS').value).toEqual(put(declineRevisionSetFormState('SUCCESS')))
      expect(clone.next().done).toBe(true)
    })

    test('api call fail', () => {
      const clone = gen.clone()
      expect(clone.next(undefined).value).toEqual(put(declineRevisionSetFormState('ERROR')))
      expect(clone.next().done).toBe(true)
    })
  })
})
