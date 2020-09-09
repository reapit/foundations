import { put, takeLatest, call } from '@redux-saga/core/effects'
import {
  developerSetStatusRequestSuccess,
  developerSetStatusRequestLoading,
  developerSetStatusRequestFailure,
} from '@/actions/developer-set-status'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { notification } from '@reapit/elements'
import errorMessages from '@/constants/error-messages'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { updateDeveloperById } from '@/services/developers'

export const developerSetStatusRequestSaga = function*({ data: dev }) {
  try {
    if (!dev.id) {
      throw new Error('developerId is not exist')
    }

    yield put(developerSetStatusRequestLoading())

    yield call(updateDeveloperById, { ...dev, companyName: dev.company })

    yield put(developerSetStatusRequestSuccess())
  } catch (err) {
    yield put(developerSetStatusRequestFailure())
    yield call(notification.error, {
      message: err?.description ?? errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const developerSetStatusRequestListen = function*() {
  yield takeLatest<Action<DeveloperModel>>(ActionTypes.DEVELOPER_SET_STATUS_REQUEST, developerSetStatusRequestSaga)
}

export default developerSetStatusRequestListen
