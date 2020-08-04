import { declineRevisionSetFormState, RevisionDeclineRequestParams } from '../actions/revision-detail'
import { put, call, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'
import { logger } from '@reapit/utils'
import { rejectAppRevisionById } from '@/services/apps'
import { fork } from 'redux-saga/effects'

export const declineRevision = function*({ data: params }: Action<RevisionDeclineRequestParams>) {
  yield put(declineRevisionSetFormState('SUBMITTING'))
  const { appId, appRevisionId, callback, ...body } = params
  try {
    const response = yield call(rejectAppRevisionById, { id: appId, revisionId: appRevisionId, ...body })

    const status = response ? 'SUCCESS' : 'ERROR'
    if (status === 'SUCCESS') {
      if (callback) {
        callback()
      }
    }
    yield put(declineRevisionSetFormState(status))
  } catch (err) {
    logger(err)
    yield put(declineRevisionSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const declineRevisionListen = function*() {
  yield takeLatest<Action<RevisionDeclineRequestParams>>(ActionTypes.REVISION_SUBMIT_DECLINE, declineRevision)
}

const revisionDetailSagas = function*() {
  yield all([fork(declineRevisionListen)])
}

export default revisionDetailSagas
