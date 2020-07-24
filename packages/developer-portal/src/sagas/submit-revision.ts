import { imageUploaderHelper } from '@/services/upload'
import { SubmitRevisionParams } from '../actions/submit-revision'
import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { fetchAppDetail } from '@/actions/app-detail'
import { logger } from '@reapit/utils'
import { createAppRevision } from '@/services/apps'

export const submitRevision = function*({ data }: Action<SubmitRevisionParams>) {
  // TODO: for this situation we need check the value of imageData
  // upload and also update into imageUrl as new property from backend
  const { params, onSuccess, onError } = data
  try {
    const {
      id,
      name,
      iconImageUrl,
      screen1ImageUrl,
      screen2ImageUrl,
      screen3ImageUrl,
      screen4ImageUrl,
      screen5ImageUrl,
      categoryId,
      ...body
    } = params

    const formatedName = name ? name.replace(/\s+/g, '-') : ''
    const imageUploaderReqs = [
      imageUploaderHelper({ name: `${formatedName}-icon`, imageData: iconImageUrl }),
      imageUploaderHelper({ name: `${formatedName}-screen1ImageUrl`, imageData: screen1ImageUrl }),
      imageUploaderHelper({ name: `${formatedName}-screen2ImageUrl`, imageData: screen2ImageUrl }),
      imageUploaderHelper({ name: `${formatedName}-screen3ImageUrl`, imageData: screen3ImageUrl }),
      imageUploaderHelper({ name: `${formatedName}-screen4ImageUrl`, imageData: screen4ImageUrl }),
      imageUploaderHelper({ name: `${formatedName}-screen5ImageUrl`, imageData: screen5ImageUrl }),
    ]

    const imageUploaderResults = yield all(imageUploaderReqs)
    const updatedValues = {
      ...body,
      iconImageUrl: imageUploaderResults[0] ? imageUploaderResults[0].Url : iconImageUrl,
      screen1ImageUrl: imageUploaderResults[1] ? imageUploaderResults[1].Url : screen1ImageUrl,
      screen2ImageUrl: imageUploaderResults[2] ? imageUploaderResults[2].Url : screen2ImageUrl,
      screen3ImageUrl: imageUploaderResults[3] ? imageUploaderResults[3].Url : screen3ImageUrl,
      screen4ImageUrl: imageUploaderResults[4] ? imageUploaderResults[4].Url : screen4ImageUrl,
      screen5ImageUrl: imageUploaderResults[5] ? imageUploaderResults[5].Url : screen5ImageUrl,
      name,
    }

    const updatedValuesAfterValidatingCategoryId = {
      ...updatedValues,
      categoryId: categoryId === '' ? undefined : categoryId,
    }

    const regResponse: true | undefined = yield call(createAppRevision, {
      id,
      ...updatedValuesAfterValidatingCategoryId,
    })

    const status = regResponse ? 'SUCCESS' : 'ERROR'
    if (status === 'SUCCESS') {
      yield put(fetchAppDetail({ id }))
      onSuccess()
    } else {
      onError()
    }
  } catch (err) {
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
    onError()
  }
}

export const submitRevisionDataListen = function*() {
  yield takeLatest<Action<SubmitRevisionParams>>(ActionTypes.DEVELOPER_SUBMIT_REVISION, submitRevision)
}

export const submitRevisionSagas = function*() {
  yield all([fork(submitRevisionDataListen)])
}

export default submitRevisionSagas
