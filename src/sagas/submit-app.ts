import { ImageUploaderRes } from './submit-app'
import { fetcher, FetchError, isBase64 } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS, REAPIT_API_BASE_URL, UPLOAD_FILE_BASE_URL } from '../constants/api'
import { submitAppSetFormState, submitAppLoading, submitAppReceiveData } from '../actions/submit-app'
import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import { SubmitAppArgs } from '@/actions/submit-app'
import errorMessages from '../constants/error-messages'
import { getApiErrorsFromResponse, ApiFormErrorsResponse } from '@/utils/form/errors'

export type ImageUploaderReq = {
  name?: string
  imageData?: string
}

export type ImageUploaderRes = {
  Url?: string
}

export const imageUploaderHelper = async (object: ImageUploaderReq) => {
  const { imageData, name } = object

  if (!imageData || !name || !isBase64(imageData)) {
    return null
  }

  return fetcher({
    url: '/',
    api: UPLOAD_FILE_BASE_URL,
    method: 'POST',
    headers: MARKETPLACE_HEADERS,
    body: object
  })
}

export const submitApp = function*({ data }: Action<SubmitAppArgs>) {
  const { actions, ...values } = data
  actions.setStatus(undefined)

  yield put(submitAppSetFormState('SUBMITTING'))
  try {
    const { name, iconImageData, screen1ImageData, screen2ImageData, screen3ImageData, screen4ImageData } = values

    const formatedName = name ? name.replace(/\s+/g, '-') : ''
    const imageUploaderReqs = [
      imageUploaderHelper({ name: `${formatedName}-icon`, imageData: iconImageData }),
      imageUploaderHelper({ name: `${formatedName}-screen1ImageData`, imageData: screen1ImageData }),
      imageUploaderHelper({ name: `${formatedName}-screen2ImageData`, imageData: screen2ImageData }),
      imageUploaderHelper({ name: `${formatedName}-screen3ImageData`, imageData: screen3ImageData }),
      imageUploaderHelper({ name: `${formatedName}-screen4ImageData`, imageData: screen4ImageData })
    ]

    const imageUploaderResults = yield all(imageUploaderReqs)
    const updatedValues = {
      ...values,
      iconImageData: '',
      screen1ImageData: '',
      screen2ImageData: '',
      screen3ImageData: '',
      screen4ImageData: '',
      iconImageUrl: imageUploaderResults[0] ? imageUploaderResults[0].Url : '',
      screen1ImageUrl: imageUploaderResults[1] ? imageUploaderResults[1].Url : '',
      screen2ImageUrl: imageUploaderResults[2] ? imageUploaderResults[2].Url : '',
      screen3ImageUrl: imageUploaderResults[3] ? imageUploaderResults[3].Url : '',
      screen4ImageUrl: imageUploaderResults[4] ? imageUploaderResults[4].Url : ''
    }

    yield call(fetcher, {
      url: URLS.apps,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      body: updatedValues,
      headers: MARKETPLACE_HEADERS
    })

    yield put(submitAppSetFormState('SUCCESS'))
  } catch (err) {
    console.error(err)

    if (err instanceof FetchError) {
      const response = err.response as unknown
      const formErrors = getApiErrorsFromResponse(response as ApiFormErrorsResponse)
      if (formErrors) {
        actions.setErrors(formErrors)
      }
    }

    yield put(submitAppSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const submitAppsDataFetch = function*() {
  yield put(submitAppLoading(true))

  try {
    const response = yield call(fetcher, {
      url: `${URLS.scopes}`,
      method: 'GET',
      api: REAPIT_API_BASE_URL,
      headers: MARKETPLACE_HEADERS
    })
    yield put(submitAppLoading(false))
    yield put(submitAppReceiveData(response))
  } catch (err) {
    yield put(submitAppLoading(false))
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const submitAppDataFetchListen = function*() {
  yield takeLatest<Action<void>>(ActionTypes.DEVELOPER_SUBMIT_APP_REQUEST_DATA, submitAppsDataFetch)
}

export const submitAppDataListen = function*() {
  yield takeLatest<Action<SubmitAppArgs>>(ActionTypes.DEVELOPER_SUBMIT_APP, submitApp)
}

export const submitAppSagas = function*() {
  yield all([fork(submitAppDataListen), fork(submitAppDataFetchListen)])
}

export default submitAppSagas
