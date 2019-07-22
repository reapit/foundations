import { submitApp as submitAppSaga, submitAppDataListen, submitAppSagas } from '../submit-app'
import ActionTypes from '@/constants/action-types'
import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import { submitApp, submitAppSetFormState } from '@/actions/submit-app'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import fetcher from '@/utils/fetcher'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { CreateAppModel } from '@/types/marketplace-api-schema'
import { appSubmitStub } from '../__stubs__/apps-submit'

const params: Action<CreateAppModel> = { data: appSubmitStub.data, type: 'DEVELOPER_SUBMIT_APP' }

describe('submit-app post data', () => {
  const gen = cloneableGenerator(submitAppSaga)(params)

  expect(gen.next().value).toEqual(put(submitAppSetFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: URLS.apps,
      method: 'POST',
      body: params.data,
      headers: MARKETPLACE_HEADERS
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(true).value).toEqual(put(submitAppSetFormState('SUCCESS')))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(undefined).value).toEqual(put(submitAppSetFormState('ERROR')))
    expect(clone.next().done).toBe(true)
  })
})

describe('submit-app thunks', () => {
  describe('submitAppDataListen', () => {
    it('should submit data when called', () => {
      const gen = submitAppDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<CreateAppModel>>(ActionTypes.DEVELOPER_SUBMIT_APP, submitAppSaga)
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('submitAppSagas', () => {
    it('should listen saga', () => {
      const gen = submitAppSagas()

      expect(gen.next().value).toEqual(all([fork(submitAppDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
