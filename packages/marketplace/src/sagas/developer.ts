import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '../constants/api'
import {
  developerLoading,
  developerReceiveData,
  developerSetFormState,
  developerRequestDataFailure,
} from '../actions/developer'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { Action } from '../types/core'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { selectDeveloperId } from '@/selector/developer'
import { DeveloperItem, DeveloperRequestParams } from '@/reducers/developer'
import { logger } from 'logger'

export const developerDataFetch = function*({ data }) {
  yield put(developerLoading(true))

  try {
    const developerId = yield select(selectDeveloperId)

    if (!developerId) {
      throw new Error('Developer id does not exist in state')
    }

    const { page, appsPerPage = APPS_PER_PAGE } = data
    const [appsData, scopes] = yield all([
      call(fetcher, {
        url: `${URLS.apps}?developerId=${developerId}&PageNumber=${page}&PageSize=${appsPerPage}`,
        method: 'GET',
        api: process.env.MARKETPLACE_API_BASE_URL as string,
        headers: MARKETPLACE_HEADERS,
      }),
      call(fetcher, {
        url: `${URLS.scopes}`,
        method: 'GET',
        api: process.env.MARKETPLACE_API_BASE_URL as string,
        headers: MARKETPLACE_HEADERS,
      }),
    ])

    const developerData: DeveloperItem = {
      data: appsData,
      scopes,
    }
    if (developerData.data && developerData.scopes) {
      yield put(developerReceiveData(developerData))
    } else {
      yield put(developerRequestDataFailure())
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

export const developerCreate = function*({ data }: Action<CreateDeveloperModel>) {
  yield put(developerSetFormState('SUBMITTING'))

  try {
    const regResponse: true | undefined = yield call(fetcher, {
      url: URLS.developers,
      api: process.env.MARKETPLACE_API_BASE_URL as string,
      method: 'POST',
      body: data,
      headers: MARKETPLACE_HEADERS,
    })
    const status = regResponse ? 'SUCCESS' : 'ERROR'
    yield put(developerSetFormState(status))
  } catch (err) {
    logger(err)
    yield put(developerSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const developerRequestDataListen = function*() {
  yield takeLatest<Action<DeveloperRequestParams>>(ActionTypes.DEVELOPER_REQUEST_DATA, developerDataFetch)
}

export const developerCreateListen = function*() {
  yield takeLatest(ActionTypes.DEVELOPER_CREATE, developerCreate)
}

const developerSagas = function*() {
  yield all([fork(developerRequestDataListen), fork(developerCreateListen)])
}

export default developerSagas
