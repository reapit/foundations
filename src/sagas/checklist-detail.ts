import { fetcher } from '@reapit/elements'
import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { URLS, REAPIT_API_BASE_URL, mockHeader } from '@/constants/api'
import { errorThrownServer } from '../actions/error'
import { checklistDetailLoading, checklistDetailReceiveData } from '../actions/checklist-detail'
import errorMessages from '../constants/error-messages'

export const checklistDetailDataFetch = function*({ data: id }) {
  yield put(checklistDetailLoading(true))
  // const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const response = yield call(fetcher, {
      url: `${URLS.contacts}/${id}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: mockHeader
    })
    yield put(checklistDetailReceiveData({ contact: response }))
  } catch (err) {
    console.error(err.message)
    yield put(checklistDetailLoading(false))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const checklistDetailDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA, checklistDetailDataFetch)
}

export const checklistDetailSagas = function*() {
  yield all([fork(checklistDetailDataListen)])
}

export default checklistDetailSagas
