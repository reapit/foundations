import {
  revisionDetailLoading,
  revisionDetailReceiveData,
  revisionDetailFailure,
  RevisionDetailRequestParams,
} from '../actions/revision-detail'
import { put, call, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'
import { logger } from '@reapit/utils'
import { fetchAppRevisionsById } from '@/services/apps'
import { fetchScopesList } from '@/services/scopes'
import { fetchDesktopIntegrationTypesList } from '@/services/desktop-integration-types'
import { fork } from 'redux-saga/effects'

export const revisionDetailDataFetch = function*({
  data: { appId, appRevisionId },
}: Action<RevisionDetailRequestParams>) {
  yield put(revisionDetailLoading(true))
  try {
    const [response, scopes, desktopIntegrationTypes] = yield all([
      call(fetchAppRevisionsById, { id: appId, revisionId: appRevisionId }),
      call(fetchScopesList),
      call(fetchDesktopIntegrationTypesList, {}),
    ])

    if (response && scopes && desktopIntegrationTypes) {
      yield put(revisionDetailReceiveData({ data: response, scopes, desktopIntegrationTypes }))
    } else {
      yield put(revisionDetailFailure())
    }
  } catch (err) {
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const revisionDetailDataListen = function*() {
  yield takeLatest<Action<RevisionDetailRequestParams>>(
    ActionTypes.REVISION_DETAIL_REQUEST_DATA,
    revisionDetailDataFetch,
  )
}

const revisionDetailSagas = function*() {
  yield all([fork(revisionDetailDataListen)])
}

export default revisionDetailSagas
