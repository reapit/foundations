import fetcher from '../utils/fetcher'
import { URLS, MARKETPLACE_HEADERS } from '../constants/api'
import { submitAppSetFormState } from '../actions/submit-app'
import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { CreateAppModel } from '@/types/marketplace-api-schema'

export const submitApp = function*({ data }: Action<CreateAppModel>) {
  yield put(submitAppSetFormState('SUBMITTING'))
  try {
    const regResponse: true | undefined = yield call(fetcher, {
      url: URLS.apps,
      method: 'POST',
      body: data,
      headers: MARKETPLACE_HEADERS
    })
    const status = regResponse ? 'SUCCESS' : 'ERROR'
    yield put(submitAppSetFormState(status))
  } catch (err) {
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const submitAppDataListen = function*() {
  yield takeLatest<Action<CreateAppModel>>(ActionTypes.DEVELOPER_SUBMIT_APP, submitApp)
}

export const submitAppSagas = function*() {
  yield all([fork(submitAppDataListen)])
}

export default submitAppSagas
