import fetcher from '../utils/fetcher'
import { URLS, MARKETPLACE_HEADERS, REAPIT_API_BASE_URL } from '../constants/api'
import { submitAppSetFormState, submitAppLoading, submitAppReceiveData } from '../actions/submit-app'
import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import { SubmitAppArgs } from '@/actions/submit-app'
import errorMessages from '../constants/error-messages'
import { getApiErrorsFromResponse } from '@/utils/form/errors'
import { FetchError } from '@/utils/fetcher'

export const submitApp = function*({ data }: Action<SubmitAppArgs>) {
  const { actions, ...values } = data
  actions.setStatus(undefined)

  yield put(submitAppSetFormState('SUBMITTING'))
  try {
    yield call(fetcher, {
      url: URLS.apps,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      body: values,
      headers: MARKETPLACE_HEADERS
    })
    yield put(submitAppSetFormState('SUCCESS'))
  } catch (err) {
    console.error(err)

    if (err instanceof FetchError) {
      const formErrors = getApiErrorsFromResponse(err.response)
      if (formErrors) {
        actions.setErrors(formErrors)
      }
    }

    yield put(submitAppSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const submitAppsDataFetch = function*() {
  yield put(submitAppLoading(true))

  try {
    const response = yield call(fetcher, {
      url: `${URLS.scopes}`,
      method: 'GET',
      api: REAPIT_API_BASE_URL,
      headers: MARKETPLACE_HEADERS
    })
    yield put(submitAppLoading(false))
    yield put(submitAppReceiveData(response))
  } catch (err) {
    yield put(submitAppLoading(false))
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const submitAppDataFetchListen = function*() {
  yield takeLatest<Action<void>>(ActionTypes.DEVELOPER_SUBMIT_APP_REQUEST_DATA, submitAppsDataFetch)
}

export const submitAppDataListen = function*() {
  yield takeLatest<Action<SubmitAppArgs>>(ActionTypes.DEVELOPER_SUBMIT_APP, submitApp)
}

export const submitAppSagas = function*() {
  yield all([fork(submitAppDataListen), fork(submitAppDataFetchListen)])
}

export default submitAppSagas
