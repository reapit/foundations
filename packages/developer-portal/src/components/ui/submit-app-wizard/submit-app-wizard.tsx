import React, { useState } from 'react'
import qs from 'query-string'
import AuthFlow from '@/constants/app-auth-flow'
import { Dispatch } from 'redux'

import { useDispatch } from 'react-redux'
import { StepBeforeYouStart } from './steps/step-before-you-start'
import { StepInputAppName } from './steps/step-input-app-name'
import { StepCreateNewApp } from './steps/step-create-new-app'
import { StepInputAuthenticationUris } from './steps/step-input-authentication-uris'
import { StepGrantPermissions } from './steps/step-grant-permisions'
import { StepSubmitAppSuccess } from './steps/step-submit-app-success'
import { StepChoseAuthType } from './steps/step-chose-auth-type'
import { ModalHeader, Formik, FormikHelpers, ModalProps, Form } from '@reapit/elements'
import { WizardStep, WizardStepComponent, SetWizardStep } from './types'
import { formFields } from './form-fields'
import { validationSchemas } from './validation-schema'
import { wizzardSteps } from './constant'
import { createApp, fetchAppList } from '@/actions/apps'
import { AppDetailModel, CreateAppModel } from '@reapit/foundations-ts-definitions'
import { CreateAppParams } from '@/services/apps'

const componentMap: Record<WizardStep, WizardStepComponent> = {
  BEFORE_YOU_START: StepBeforeYouStart,
  INPUT_APP_NAME: StepInputAppName,
  CREATE_NEW_APP: StepCreateNewApp,
  INPUT_AUTHENTICATION_URIS: StepInputAuthenticationUris,
  GRANT_PERMISSION: StepGrantPermissions,
  SUBMIT_APP_SUCCESS: StepSubmitAppSuccess,
  INPUT_ATHENTICATION_TYPE: StepChoseAuthType,
}

const titleMap: Record<WizardStep, string> = {
  BEFORE_YOU_START: 'Before you start',
  INPUT_APP_NAME: 'App Name',
  CREATE_NEW_APP: 'Create a new app',
  INPUT_AUTHENTICATION_URIS: 'Authentication',
  GRANT_PERMISSION: 'Permissions',
  SUBMIT_APP_SUCCESS: 'Success',
  INPUT_ATHENTICATION_TYPE: 'Authentication',
}

const { nameField, redirectUrisField, signoutUrisField, scopesField, externalIdField, appIdField } = formFields

export type HandleSubmitParams = {
  dispatch: Dispatch
  setWizardStep: SetWizardStep
}

export type CustomCreateAppModel = Pick<CreateAppModel, 'name' | 'authFlow' | 'scopes'> & {
  redirectUris?: string
  signoutUris?: string
}

export const handleSubmitAppSuccessCallback = (
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
  setWizardStep: React.Dispatch<React.SetStateAction<WizardStep>>,
  dispatch: Dispatch,
) => {
  return (appDetail: AppDetailModel) => {
    const page = qs.parse(location.search)?.page || 1
    const { externalId, id } = appDetail
    setFieldValue(externalIdField.name, externalId)
    setFieldValue(appIdField.name, id)
    setWizardStep(wizzardSteps.SUBMIT_APP_SUCCESS)
    dispatch(fetchAppList({ page }))
  }
}

export const handleSubmit = ({ dispatch, setWizardStep }: HandleSubmitParams) => (
  values: CustomCreateAppModel,
  actions: FormikHelpers<CustomCreateAppModel>,
) => {
  const { redirectUris, signoutUris, ...otherData } = values

  const appToSubmit: CreateAppParams = {
    ...otherData,
    redirectUris: redirectUris
      ? redirectUris
          .split(',')
          // trim empty spaces
          .map(url => url.trim())
          // filter empty urls
          .filter(url => url)
      : [],
    signoutUris: signoutUris
      ? signoutUris
          // ^ be transformed same as redirectUris
          .split(',')
          .map(url => url.trim())
          .filter(url => url)
      : [],
    successCallback: handleSubmitAppSuccessCallback(actions.setFieldValue, setWizardStep, dispatch),
  }

  if (appToSubmit.authFlow === AuthFlow.CLIENT_SECRET) {
    delete appToSubmit[redirectUrisField.name]
    delete appToSubmit[signoutUrisField.name]
  }

  dispatch(createApp(appToSubmit))
}

const initialFormValues = {
  [nameField.name]: '',
  [redirectUrisField.name]: '',
  [signoutUrisField.name]: '',
  [scopesField.name]: [],
}

export const SubmitAppWizard: React.FC<Pick<ModalProps, 'afterClose'>> = ({ afterClose }) => {
  const [currentWizardStep, setWizardStep] = useState<WizardStep>(wizzardSteps.BEFORE_YOU_START)
  const dispatch = useDispatch()

  const CurrentStepComponent = componentMap[currentWizardStep as WizardStep]
  if (!CurrentStepComponent) {
    return null
  }

  return (
    <div>
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleSubmit({ setWizardStep, dispatch })}
        validationSchema={validationSchemas[currentWizardStep]}
      >
        <Form
          onKeyPress={e => {
            const key = e.charCode || e.keyCode || 0
            // prevent submit form using enter
            // not handle yet
            const enterKeyCode = 13
            if (key === enterKeyCode) {
              e.preventDefault()
            }
          }}
        >
          <ModalHeader title={titleMap[currentWizardStep]} afterClose={afterClose} />
          <CurrentStepComponent afterClose={afterClose} setWizardStep={setWizardStep} />
        </Form>
      </Formik>
    </div>
  )
}
