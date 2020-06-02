import { FetchError } from '@reapit/elements'
import { FIELD_ERROR_DESCRIPTION } from '@/constants/form'
import { submitAppSetFormState, submitAppLoading, submitAppReceiveData } from '../actions/submit-app'
import { categoriesReceiveData } from '../actions/app-categories'
import { integrationTypesReceiveData } from '@/actions/app-integration-types'
import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import { SubmitAppArgs } from '@/actions/submit-app'
import errorMessages from '../constants/error-messages'
import { getApiErrorsFromResponse, ApiFormErrorsResponse } from '@/utils/form/errors'
import { logger } from '@reapit/utils'
import { imageUploaderHelper } from '@/services/upload'
import { fetchScopesList } from '@/services/scopes'
import { createApp } from '@/services/apps'
import { fetchCategoriesList } from '@/services/categories'
import { fetchDesktopIntegrationTypesList } from '@/services/desktop-integration-types'

export const submitApp = function*({ data }: Action<SubmitAppArgs>) {
  const { actions, ...values } = data
  actions.setStatus(undefined)

  yield put(submitAppSetFormState('SUBMITTING'))
  try {
    const {
      name,
      iconImageUrl,
      screen1ImageUrl,
      screen2ImageUrl,
      screen3ImageUrl,
      screen4ImageUrl,
      screen5ImageUrl,
      categoryId,
    } = values

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
      ...values,
      iconImageUrl: imageUploaderResults[0] ? imageUploaderResults[0].Url : '',
      screen1ImageUrl: imageUploaderResults[1] ? imageUploaderResults[1].Url : '',
      screen2ImageUrl: imageUploaderResults[2] ? imageUploaderResults[2].Url : '',
      screen3ImageUrl: imageUploaderResults[3] ? imageUploaderResults[3].Url : '',
      screen4ImageUrl: imageUploaderResults[4] ? imageUploaderResults[4].Url : '',
      screen5ImageUrl: imageUploaderResults[5] ? imageUploaderResults[5].Url : '',
    }

    const updatedValuesAfterValidatingCategoryId = {
      ...updatedValues,
      categoryId: categoryId === '' ? undefined : categoryId,
    }

    yield call(createApp, updatedValuesAfterValidatingCategoryId)

    yield put(submitAppSetFormState('SUCCESS'))
  } catch (err) {
    logger(err)

    let formErrors: Record<string, string | string[]> | null = {}
    if (err instanceof FetchError) {
      const response = err.response as any
      const responseApiFormErrorResponse = response as ApiFormErrorsResponse
      formErrors = getApiErrorsFromResponse(responseApiFormErrorResponse) || {}
    }

    const errorDescription = err?.response?.description
    if (errorDescription) {
      formErrors[FIELD_ERROR_DESCRIPTION] = errorDescription
    }

    if (formErrors && Object.keys(formErrors).length > 0) {
      yield call(actions.setErrors, formErrors)
    }

    yield put(submitAppSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: err?.response?.description || errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const submitAppsDataFetch = function*() {
  yield put(submitAppLoading(true))

  try {
    const [scopes, categories, integrationTypes] = yield all([
      call(fetchScopesList),
      call(fetchCategoriesList, {}),
      call(fetchDesktopIntegrationTypesList, {}),
    ])
    yield put(submitAppLoading(false))
    yield put(submitAppReceiveData(scopes))
    yield put(categoriesReceiveData(categories))
    yield put(integrationTypesReceiveData(integrationTypes))
  } catch (err) {
    logger(err)
    yield put(submitAppLoading(false))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
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
