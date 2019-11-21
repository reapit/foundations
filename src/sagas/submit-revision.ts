import { imageUploaderHelper } from './submit-app'
import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS, REAPIT_API_BASE_URL } from '../constants/api'
import { submitRevisionSetFormState } from '../actions/submit-revision'
import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action, ReduxState } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { CreateAppRevisionModel } from '@/types/marketplace-api-schema'
import { appDetailRequestData } from '@/actions/app-detail'

export const submitRevision = function*({ data }: Action<CreateAppRevisionModel & { id: string }>) {
  yield put(submitRevisionSetFormState('SUBMITTING'))

  // TODO: for this situation we need check the value of imageData
  // upload and also update into imageUrl as new property from backend
  try {
    const { id, name, iconImageUrl, screen1ImageUrl, screen2ImageUrl, screen3ImageUrl, screen4ImageUrl, ...body } = data

    const formatedName = name ? name.replace(/\s+/g, '-') : ''
    const imageUploaderReqs = [
      imageUploaderHelper({ name: `${formatedName}-icon`, imageData: iconImageUrl }),
      imageUploaderHelper({ name: `${formatedName}-screen1ImageUrl`, imageData: screen1ImageUrl }),
      imageUploaderHelper({ name: `${formatedName}-screen2ImageUrl`, imageData: screen2ImageUrl }),
      imageUploaderHelper({ name: `${formatedName}-screen3ImageUrl`, imageData: screen3ImageUrl }),
      imageUploaderHelper({ name: `${formatedName}-screen4ImageUrl`, imageData: screen4ImageUrl })
    ]

    const imageUploaderResults = yield all(imageUploaderReqs)
    const updatedValues = {
      ...body,
      iconImageUrl: imageUploaderResults[0] ? imageUploaderResults[0].Url : iconImageUrl,
      screen1ImageUrl: imageUploaderResults[1] ? imageUploaderResults[1].Url : screen1ImageUrl,
      screen2ImageUrl: imageUploaderResults[2] ? imageUploaderResults[2].Url : screen2ImageUrl,
      screen3ImageUrl: imageUploaderResults[3] ? imageUploaderResults[3].Url : screen3ImageUrl,
      screen4ImageUrl: imageUploaderResults[4] ? imageUploaderResults[4].Url : screen4ImageUrl,
      name
    }

    const regResponse: true | undefined = yield call(fetcher, {
      url: `${URLS.apps}/${id}/revisions`,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      body: updatedValues,
      headers: MARKETPLACE_HEADERS
    })

    const status = regResponse ? 'SUCCESS' : 'ERROR'
    if (status === 'SUCCESS') {
      yield put(appDetailRequestData({ id }))
    }

    yield put(submitRevisionSetFormState(status))
  } catch (err) {
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
    yield put(submitRevisionSetFormState('ERROR'))
  }
}

export const submitRevisionDataListen = function*() {
  yield takeLatest<Action<CreateAppRevisionModel & { id: string }>>(
    ActionTypes.DEVELOPER_SUBMIT_REVISION,
    submitRevision
  )
}

export const submitRevisionSagas = function*() {
  yield all([fork(submitRevisionDataListen)])
}

export default submitRevisionSagas
