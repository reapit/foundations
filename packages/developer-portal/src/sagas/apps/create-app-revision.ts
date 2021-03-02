import { put, call, takeLatest, all, fork } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import errorMessages from '@/constants/error-messages'
import { createAppRevisionAPI, CreateAppRevisionParams } from '@/services/apps'
import { createAppRevisionSuccess, createAppRevisionFailed, createAppRevision } from '@/actions/apps'
import { notification } from '@reapit/elements'
import { imageUploaderHelper } from '@/services/upload'

export const createAppRevisionSaga = function* ({
  data: {
    id,
    name,
    iconImageUrl,
    screen1ImageUrl,
    screen2ImageUrl,
    screen3ImageUrl,
    screen4ImageUrl,
    screen5ImageUrl,
    categoryId,
    successCallback,
    errorCallback,
    ...body
  },
}: Action<CreateAppRevisionParams>) {
  try {
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

    yield call(createAppRevisionAPI, {
      id,
      ...updatedValuesAfterValidatingCategoryId,
    })
    yield put(createAppRevisionSuccess())
    if (successCallback) {
      successCallback()
    }
  } catch (err) {
    if (errorCallback) {
      errorCallback()
    }
    yield put(createAppRevisionFailed())
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const createAppRevisionSagaListen = function* () {
  yield takeLatest<Action<CreateAppRevisionParams>>(createAppRevision.type, createAppRevisionSaga)
}

export const createAppRevisionSagas = function* () {
  yield all([fork(createAppRevisionSagaListen)])
}

export default createAppRevisionSagas
