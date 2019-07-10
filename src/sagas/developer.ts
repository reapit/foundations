import fetcher from '../utils/fetcher'
import { URLS, MARKETPLACE_HEADERS } from '../constants/api'
import { developerLoading, developerReceiveData, developerSetFormState } from '../actions/developer'
import { DeveloperItem } from '../reducers/developer'
import { put, delay, fork, takeLatest, all, call, takeEvery } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { CreateDeveloperModel } from '../types/marketplace-api-schema'
import { Action } from '../types/core'

export const mockDeveloperData: DeveloperItem = {
  data: Array.from({ length: 20 }, (i, k) => k).map(i => ({
    id: i.toString(),
    appName: 'Team',
    developerName: 'microsoft',
    developerId: 'dfJ28xl',
    displayImage: '',
    displayText:
      'Brings everything together in a shared workspace where you can chat, meet, share files, and work with business apps'
  }))
}

export const developerDataFetch = function*() {
  yield put(developerLoading(true))

  try {
    yield delay(1000)
    yield put(developerReceiveData(mockDeveloperData))
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

export const developerCreate = function*({ data }: Action<CreateDeveloperModel>) {
  yield put(developerSetFormState('SUBMITTING'))

  try {
    const regResponse: true | undefined = yield call(fetcher, {
      url: URLS.developerCreate,
      method: 'POST',
      body: data,
      headers: MARKETPLACE_HEADERS
    })
    const status = regResponse ? 'SUCCESS' : 'ERROR'
    yield put(developerSetFormState(status))
  } catch (err) {
    console.error(err.message)
    yield put(developerSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const developerDataListen = function*() {
  yield takeLatest(ActionTypes.DEVELOPER_REQUEST_DATA, developerDataFetch)
  yield takeEvery(ActionTypes.DEVELOPER_CREATE, developerCreate)
}

const developerSagas = function*() {
  yield all([fork(developerDataListen)])
}

export default developerSagas
