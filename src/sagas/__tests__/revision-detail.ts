import revisionDetailSagas, { revisionDetailDataFetch, revisionDetailDataListen } from '../revision-detail'
import { revisionDetailDataStub } from '../__stubs__/revision-detail'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import {
  revisionDetailLoading,
  revisionDetailReceiveData,
  revisionDetailFailure,
  RevisionDetailRequestParams
} from '@/actions/revision-detail'
import { Action } from '@/types/core'
import fetcher from '@/utils/fetcher'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { REAPIT_API_BASE_URL } from '../../constants/api'

jest.mock('../../utils/fetcher')

const params: Action<RevisionDetailRequestParams> = {
  type: 'REVISION_DETAIL_RECEIVE_DATA',
  data: { appId: '9b6fd5f7-2c15-483d-b925-01b650538e52', appRevisionId: '9b6fd5f7-2c15-483d-b925-01b650538e52' }
}

describe('app-detail fetch data', () => {
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

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(revisionDetailDataStub.data).value).toEqual(
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

describe('app-detail thunks', () => {
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

      expect(gen.next().value).toEqual(all([fork(revisionDetailDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
