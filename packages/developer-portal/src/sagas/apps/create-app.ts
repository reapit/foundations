import { FetchError } from '@reapit/elements'
import { notification } from '@reapit/elements'
import { FIELD_ERROR_DESCRIPTION } from '@/constants/form'
// import {
//   submitAppSetFormState,
//   submitAppLoading,
//   submitAppReceiveData,
//   CustomCreateAppModel,
// } from '@/actions/submit-app'
import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import errorMessages from '@/constants/error-messages'
import { getApiErrorsFromResponse, ApiFormErrorsResponse } from '@/utils/form/errors'
import { logger } from '@reapit/utils'
import { createAppAPI, fetchAppByIdByRawUrl, CreateAppParams } from '@/services/apps'
import { selectDeveloperId } from '@/selector/auth'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
// import { formFields } from '@/components/ui/submit-app-wizard/form-fields'
import { createAppSuccess } from '@/actions/apps'

// const { externalIdField, appIdField } = formFields

export const submitApp = function*({ data }: Action<CreateAppParams>) {
  try {
    const developerId = yield select(selectDeveloperId)
    if (!developerId) {
      return
    }
    const { callback, ...appProps } = data
    const headers: Headers = yield call(createAppAPI, { ...appProps, developerId })

    // ^ got Illegal invocation when: const locationHeader = yield call(headers.get, 'location')
    const locationHeader = headers.get('location')

    if (typeof locationHeader !== 'string') {
      throw new Error("Location header is not returned from Create App API's response")
    }
    const appDetail: AppDetailModel = yield call(fetchAppByIdByRawUrl, locationHeader)

    if (!appDetail) {
      throw new Error('app detail response is undefined')
    }

    yield put(createAppSuccess())

    if (callback) {
      callback(appDetail)
    }
    // yield call(setFieldValue, externalIdField.name, appDetail.externalId)
    // yield call(setFieldValue, appIdField.name, appDetail.id)
    // yield call(setWizardStep, wizzardSteps.SUBMIT_APP_SUCCESS)
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
    // if (formErrors && Object.keys(formErrors).length > 0) {
    //   yield call(setErrors, formErrors as FormikErrors<CustomCreateAppModel>)
    // }
    yield call(notification.error, {
      message: err?.response?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
      duration: 0,
    })
  }
}

export const createAppListen = function*() {
  yield takeLatest<Action<CreateAppParams>>(ActionTypes.CREATE_APP, submitApp)
}

export const createAppSagas = function*() {
  yield all([fork(createAppListen)])
}

export default createAppSagas
