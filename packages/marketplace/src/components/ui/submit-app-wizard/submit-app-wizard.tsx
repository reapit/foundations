import React, { useState } from 'react'
import AuthFlow from '@/constants/app-auth-flow'
import { selectSubmitAppLoadingState } from '@/selector/submit-app'
import { useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { submitApp, CustomCreateAppModel } from '@/actions/submit-app'
import { useDispatch } from 'react-redux'
import { StepBeforeYouStart } from './steps/step-before-you-start'
import { StepInputAppName } from './steps/step-input-app-name'
import { StepCreateNewApp } from './steps/step-create-new-app'
import { StepInputAuthenticationUris } from './steps/step-input-authentication-uris'
import { StepGrantPermissions } from './steps/step-grant-permisions'
import { StepSubmitAppSuccess } from './steps/step-submit-app-success'
import { StepChoseAuthType } from './steps/step-chose-auth-type'
import { Loader, ModalHeader, Formik, FormikHelpers, ModalProps, Form } from '@reapit/elements'
import { WizardStep, WizardStepComponent, SetWizardStep } from './types'
import { formFields } from './form-fields'
import { validationSchemas } from './validation-schema'
import { wizzardSteps } from './constant'

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

const { nameField, redirectUrisField, signoutUrisField, scopesField } = formFields

export type HandleSubmitParams = {
  dispatch: Dispatch
  setWizardStep: SetWizardStep
}

export const handleSubmit = ({ dispatch, setWizardStep }: HandleSubmitParams) => (
  values: CustomCreateAppModel,
  actions: FormikHelpers<CustomCreateAppModel>,
) => {
  const { redirectUris, signoutUris, ...otherData } = values

  const appToSubmit = {
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
  }

  if (appToSubmit.authFlow === AuthFlow.CLIENT_SECRET) {
    delete appToSubmit[redirectUrisField.name]
    delete appToSubmit[signoutUrisField.name]
  }

  dispatch(
    submitApp({
      ...appToSubmit,
      setFieldValue: actions.setFieldValue,
      setErrors: actions.setErrors,
      setWizardStep,
    }),
  )
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
  const isSubmitAppLoading = useSelector(selectSubmitAppLoadingState)

  const CurrentStepComponent = componentMap[currentWizardStep as WizardStep]

  if (isSubmitAppLoading) {
    return <Loader />
  }

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
        <Form>
          <ModalHeader title={titleMap[currentWizardStep]} afterClose={afterClose} />
          <CurrentStepComponent afterClose={afterClose} setWizardStep={setWizardStep} />
        </Form>
      </Formik>
    </div>
  )
}
