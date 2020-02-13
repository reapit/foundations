import { put, takeLatest, call } from '@redux-saga/core/effects'
import {
  developerSetStatusRequestSuccess,
  developerSetStatusRequestLoading,
  developerSetStatusRequestFailure,
} from '@/actions/developer-set-status'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { logger } from 'logger'

export const developerSetStatusRequestSaga = function*({ data: dev }) {
  try {
    if (!dev.id) {
      throw new Error('developerId is not exist')
    }

    yield put(developerSetStatusRequestLoading())

    yield call(fetcher, {
      url: `${URLS.developers}/${dev.id}`,
      api: process.env.MARKETPLACE_API_BASE_URL as string,
      body: { ...dev, companyName: dev.company },
      method: 'PUT',
      headers: MARKETPLACE_HEADERS,
    })

    yield put(developerSetStatusRequestSuccess())
  } catch (err) {
    logger(err)
    yield put(developerSetStatusRequestFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const developerSetStatusRequestListen = function*() {
  yield takeLatest<Action<DeveloperModel>>(ActionTypes.DEVELOPER_SET_STATUS_REQUEST, developerSetStatusRequestSaga)
}

export default developerSetStatusRequestListen
