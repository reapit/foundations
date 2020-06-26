import { FetchError, FormikErrors } from '@reapit/elements'
import { FIELD_ERROR_DESCRIPTION } from '@/constants/form'
import {
  submitAppSetFormState,
  submitAppLoading,
  submitAppReceiveData,
  CustomCreateAppModel,
} from '../actions/submit-app'
import { categoriesReceiveData } from '../actions/app-categories'
import { integrationTypesReceiveData } from '@/actions/app-integration-types'
import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import { SubmitAppArgs } from '@/actions/submit-app'
import errorMessages from '../constants/error-messages'
import { getApiErrorsFromResponse, ApiFormErrorsResponse } from '@/utils/form/errors'
import { logger } from '@reapit/utils'
import { fetchScopesList } from '@/services/scopes'
import { createApp } from '@/services/apps'
import { fetchCategoriesList } from '@/services/categories'
import { fetchDesktopIntegrationTypesList } from '@/services/desktop-integration-types'
import { selectDeveloperId } from '@/selector/auth'

export const submitApp = function*({ data }: Action<SubmitAppArgs>) {
  const { setErrors, ...values } = data

  yield put(submitAppSetFormState('SUBMITTING'))
  try {
    const developerId = yield select(selectDeveloperId)

    if (typeof developerId !== 'string') {
      throw new Error('Cant select developer id')
    }
    yield call(createApp, { ...values, developerId })

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
      yield call(setErrors, formErrors as FormikErrors<CustomCreateAppModel>)
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
