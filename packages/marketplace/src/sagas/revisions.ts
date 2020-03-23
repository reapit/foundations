import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS, generateHeader } from '../constants/api'
import { put, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { revisionsReceiveData, revisionsRequestDataFailure, RevisionsRequestParams } from '@/actions/revisions'
import { logger } from 'logger'

export const fetchAppRevisions = async (params: RevisionsRequestParams) => {
  const { appId, ...rest } = params
  const response = await fetcher({
    url: `${URLS.apps}/${appId}/revisions?${setQueryParams({ ...rest })}`,
    api: window.reapit.config.marketplaceApiUrl,
    method: 'GET',
    headers: generateHeader(window.reapit.config.marketplaceApiKey),
  })
  return response
}

export const appRevisionsSaga = function*({ data }) {
  try {
    const response = yield call(fetchAppRevisions, { ...data })
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

export default appRevisionsListen
