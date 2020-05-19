import { put, call, takeLatest, all, fork } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { revisionsReceiveData, revisionsRequestDataFailure, RevisionsRequestParams } from '@/actions/revisions'
import { logger } from 'logger'
import { fetchAppRevisionsList } from '@/services/apps'

export const appRevisionsSaga = function*({ data }) {
  try {
    const { appId: id, ...rest } = data
    const response = yield call(fetchAppRevisionsList, { ...rest, id })
    yield put(revisionsReceiveData(response))
  } catch (err) {
    logger(err)
    yield put(revisionsRequestDataFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const appRevisionsListen = function*() {
  yield takeLatest<Action<RevisionsRequestParams>>(ActionTypes.REVISIONS_REQUEST_DATA, appRevisionsSaga)
}

export const revisionsSagas = function*() {
  yield all([fork(appRevisionsListen)])
}

export default revisionsSagas
