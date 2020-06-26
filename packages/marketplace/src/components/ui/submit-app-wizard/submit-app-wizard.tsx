import React, { useState } from 'react'
import { selectSubmitAppLoadingState } from '@/selector/submit-app'
import { useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { submitApp, CustomCreateAppModel } from '@/actions/submit-app'
import { useDispatch } from 'react-redux'
import { ValidateFormikOnMount } from './utils'
import { StepBeforeYouStart } from './steps/step-before-you-start'
import { StepInputAppName } from './steps/step-input-app-name'
import { StepCreateNewApp } from './steps/step-create-new-app'
import { StepInputAuthenticationUris } from './steps/step-input-authentication-uris'
import { StepGrantPermissions } from './steps/step-grant-permisions'
import { StepSubmitAppSuccess } from './steps/step-submit-app-success'
import { Loader, ModalHeader, Formik, FormikHelpers, ModalProps } from '@reapit/elements'
import { Form } from '@reapit/elements'
import { WizardStep, WizardStepComponent, SetWizardStep } from './types'
import { formFields } from './form-fields'
import { validationSchemas } from './validation-schema'

const componentMap: Record<WizardStep, WizardStepComponent> = {
  BEFORE_YOU_START: StepBeforeYouStart,
  INPUT_APP_NAME: StepInputAppName,
  CREATE_NEW_APP: StepCreateNewApp,
  INPUT_AUTHENTICATION_URIS: StepInputAuthenticationUris,
  GRANT_PERMISSION: StepGrantPermissions,
  SUBMIT_APP_SUCCESS: StepSubmitAppSuccess,
}

const titleMap: Record<WizardStep, string> = {
  BEFORE_YOU_START: 'Before you start',
  INPUT_APP_NAME: 'App Name',
  CREATE_NEW_APP: 'Create a new app',
  INPUT_AUTHENTICATION_URIS: 'Authentication',
  GRANT_PERMISSION: 'Permissions',
  SUBMIT_APP_SUCCESS: 'Success',
}

const { nameField, redirectUrisField, signoutUrisField, scopesField } = formFields

export type HandleSubmitParams = {
  dispatch: Dispatch
  setWizardStep: SetWizardStep
  afterClose: (() => void) | undefined
}

export const handleSubmit = ({ dispatch, setWizardStep, afterClose }: HandleSubmitParams) => (
  values: CustomCreateAppModel,
  actions: FormikHelpers<CustomCreateAppModel>,
) => {
  const { redirectUris, signoutUris, ...otherData } = values
  const appToSubmit = {
    ...otherData,
    redirectUris: redirectUris ? redirectUris.split(',') : [],
    signoutUris: signoutUris ? signoutUris.split(',') : [],
  }

  dispatch(submitApp({ ...appToSubmit, setErrors: actions.setErrors, setWizardStep, afterClose }))
}

const initialFormValues = {
  [nameField.name]: '',
  [redirectUrisField.name]: '',
  [signoutUrisField.name]: '',
  [scopesField.name]: [],
}

export const SubmitAppWizard: React.FC<Pick<ModalProps, 'afterClose'>> = ({ afterClose }) => {
  const [currentWizardStep, setWizardStep] = useState<WizardStep>('INPUT_APP_NAME')
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
        onSubmit={handleSubmit({ afterClose, setWizardStep, dispatch })}
        validationSchema={validationSchemas[currentWizardStep]}
      >
        <Form>
          <ValidateFormikOnMount />
          <ModalHeader title={titleMap[currentWizardStep]} afterClose={afterClose} />
          <CurrentStepComponent afterClose={afterClose} setWizardStep={setWizardStep} />
        </Form>
      </Formik>
    </div>
  )
}
