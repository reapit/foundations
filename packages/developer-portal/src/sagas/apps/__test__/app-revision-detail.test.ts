import { revisionDetailDataStub } from '@/sagas/__stubs__/revision-detail'
import { put, takeLatest, all, call } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetchAppRevisionsById, FetchAppRevisionsByIdParams } from '@/services/apps'
import { fork } from 'redux-saga/effects'
import revisionDetailSagas, { fetchRevisionDetailSaga, fetchRevisionDetailDataListen } from '../app-revision-detail'
import { fetchAppRevisionDetailSuccess, fetchAppRevisionDetailFailed, fetchAppRevisionDetail } from '@/actions/apps'
import errorMessages from '@/constants/error-messages'
import { notification } from '@reapit/elements'

jest.mock('@/services/apps')
jest.mock('@/services/scopes')
jest.mock('@/services/desktop-integration-types')
jest.mock('@reapit/elements')

const params: Action<FetchAppRevisionsByIdParams> = {
  type: 'FETCH_APP_REVISION_DETAIL',
  data: { id: '9b6fd5f7-2c15-483d-b925-01b650538e52', revisionId: '9b6fd5f7-2c15-483d-b925-01b650538e52' },
}

describe('revision-detail fetch data', () => {
  const gen = cloneableGenerator(fetchRevisionDetailSaga)(params)
  const {
    data: { id, revisionId },
  } = params
  expect(gen.next().value).toEqual(call(fetchAppRevisionsById, { id, revisionId }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(revisionDetailDataStub).value).toEqual(put(fetchAppRevisionDetailSuccess(revisionDetailDataStub)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(
        put(fetchAppRevisionDetailFailed(errorMessages.DEFAULT_SERVER_ERROR)),
      )
      expect(clone.next().value).toEqual(
        notification.error({
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      )
      expect(clone.next().done).toBe(true)
    }
  })
})

describe('revision-detail thunks', () => {
  describe('revisionDetailDataListen', () => {
    it('should trigger request data when called', () => {
      const gen = fetchRevisionDetailDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<FetchAppRevisionsByIdParams>>(fetchAppRevisionDetail.type, fetchRevisionDetailSaga),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('revisionDetailSagas', () => {
    it('should listen data request', () => {
      const gen = cloneableGenerator(revisionDetailSagas)()
      expect(gen.next().value).toEqual(all([fork(fetchRevisionDetailDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
