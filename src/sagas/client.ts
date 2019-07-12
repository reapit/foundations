// import fetcher from '../utils/fetcher'
// import { URLS } from '../constants/api'
import { clientLoading, clientReceiveData } from '../actions/client'
import { ClientItem } from '../reducers/client'
import { put, delay, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'

export const mockClientData: ClientItem = {
  data: [
    '8af0b9f1-3b45-48be-ae7c-8d31b622f4d0',
    '93d27798-bb48-4165-89bd-1e4cc48df4ad',
    '9b6fd5f7-2c15-483d-b925-01b650538e52'
  ].map(i => ({
    id: i.toString(),
    appName: 'Teams',
    developerName: 'Microsoft',
    developerId: 'dfJ28xl',
    displayImage: '',
    approved: Math.round(Math.random() * 2) % 2 === 0,
    displayText:
      'Brings everything together in a shared workspace where you can chat, meet, share files, and work with business apps'
  }))
}

export const clientDataFetch = function*() {
  yield put(clientLoading(true))

  try {
    yield delay(1000)
    yield put(clientReceiveData(mockClientData))
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

export const clientDataListen = function*() {
  yield takeLatest(ActionTypes.CLIENT_REQUEST_DATA, clientDataFetch)
}

const clientSagas = function*() {
  yield all([fork(clientDataListen)])
}

export default clientSagas
