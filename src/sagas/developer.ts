// import fetcher from '../utils/fetcher'
// import { URLS } from '../constants/api'
import { developerLoading, developerReceiveData } from '../actions/developer'
import { DeveloperItem } from '../reducers/developer'
import { put, delay, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'

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

export const developerDataListen = function*() {
  yield takeLatest(ActionTypes.DEVELOPER_REQUEST_DATA, developerDataFetch)
}

const developerSagas = function*() {
  yield all([fork(developerDataListen)])
}

export default developerSagas
