// import fetcher from '../utils/fetcher'
// import { URLS } from '../constants/api'
import { myAppsLoading, myAppsReceiveData } from '../actions/my-apps'
import { MyAppsItem } from '../reducers/my-apps'
import { put, delay, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'

export const mockMyAppsData: MyAppsItem = {
  data: Array.from({ length: 7 }, (i, k) => k).map(i => ({
    id: i.toString(),
    appName: 'Team',
    developerName: 'microsoft',
    developerId: 'dfJ28xl',
    displayImage: '',
    approved: Math.round(Math.random() * 2) % 2 === 0,
    displayText:
      'Brings everything together in a shared workspace where you can chat, meet, share files, and work with business apps'
  }))
}

export const myAppsDataFetch = function*() {
  yield put(myAppsLoading(true))

  try {
    yield delay(1000)
    yield put(myAppsReceiveData(mockMyAppsData))
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

export const myAppsDataListen = function*() {
  yield takeLatest(ActionTypes.MY_APPS_REQUEST_DATA, myAppsDataFetch)
}

const myAppsSagas = function*() {
  yield all([fork(myAppsDataListen)])
}

export default myAppsSagas
