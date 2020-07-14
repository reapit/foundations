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
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { logger } from '@reapit/utils'
import { updateDeveloperById } from '@/services/developers'

export const developerSetStatusRequestSaga = function*({ data: dev }) {
  const { callback } = dev
  try {
    if (!dev.id) {
      throw new Error('developerId is not exist')
    }

    yield put(developerSetStatusRequestLoading())

    yield call(updateDeveloperById, { ...dev, companyName: dev.company })

    yield put(developerSetStatusRequestSuccess())
    callback && callback(true)
  } catch (err) {
    logger(err)
    callback && callback(false)
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
