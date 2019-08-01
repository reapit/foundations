import { submitApp as submitAppSaga, submitAppDataListen, submitAppSagas } from '../submit-app'
import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import { submitAppSetFormState, SubmitAppArgs } from '@/actions/submit-app'
import { errorThrownServer } from '@/actions/error'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import fetcher from '@/utils/fetcher'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { appSubmitStubWithActions, appSubmitStub } from '../__stubs__/apps-submit'
import { REAPIT_API_BASE_URL } from '../../constants/api'

jest.mock('../../utils/fetcher')

const params: Action<SubmitAppArgs> = { data: appSubmitStubWithActions.data, type: 'DEVELOPER_SUBMIT_APP' }

describe('submit-app post data', () => {
  const gen = cloneableGenerator(submitAppSaga)(params)

  expect(gen.next().value).toEqual(put(submitAppSetFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: URLS.apps,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      body: appSubmitStub.data,
      headers: MARKETPLACE_HEADERS
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(submitAppSetFormState('SUCCESS')))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error('')).value).toEqual(put(submitAppSetFormState('ERROR')))
    expect(clone.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR
        })
      )
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('submit-app thunks', () => {
  describe('submitAppDataListen', () => {
    it('should submit data when called', () => {
      const gen = submitAppDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<SubmitAppArgs>>(ActionTypes.DEVELOPER_SUBMIT_APP, submitAppSaga)
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
