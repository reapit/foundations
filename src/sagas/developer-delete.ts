import { fetcher } from '@reapit/elements'
import { put, call, takeLatest } from '@redux-saga/core/effects'
import {
  developerDeleteRequestSuccess,
  developerDeleteRequestLoading,
  developerDeleteRequestFailure
} from '@/actions/developer-delete'
import { URLS, MARKETPLACE_HEADERS, REAPIT_API_BASE_URL } from '@/constants/api'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'

export const developerDeleteRequestSaga = function*({ data: developerId }) {
  try {
    if (!developerId) {
      throw new Error('developerId is not exist')
    }

    yield put(developerDeleteRequestLoading())

    // TODO: integrate with API

    // yield call(fetcher, {
    //   url: `${URLS.apps}/${developerId}`,
    //   api: REAPIT_API_BASE_URL,
    //   method: 'DELETE',
    //   headers: MARKETPLACE_HEADERS
    // })

    yield put(developerDeleteRequestSuccess())
  } catch (err) {
    yield put(developerDeleteRequestFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const developerDeleteRequestListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.DEVELOPER_DELETE_REQUEST, developerDeleteRequestSaga)
}

export default developerDeleteRequestListen
