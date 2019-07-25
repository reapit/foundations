import fetcher from '../utils/fetcher'
import { URLS, MARKETPLACE_HEADERS } from '../constants/api'
import { submitAppSetFormState } from '../actions/submit-app'
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

export const submitAppDataListen = function*() {
  yield takeLatest<Action<SubmitAppArgs>>(ActionTypes.DEVELOPER_SUBMIT_APP, submitApp)
}

export const submitAppSagas = function*() {
  yield all([fork(submitAppDataListen)])
}

export default submitAppSagas
