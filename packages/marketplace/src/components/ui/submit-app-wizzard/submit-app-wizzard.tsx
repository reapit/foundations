import React, { useState } from 'react'
import { ValidateFormikOnMount } from './utils'
import { useSelector } from 'react-redux'
import { StepBeforeYouStart } from './steps/step-before-you-start'
import { StepInputAppName } from './steps/step-input-app-name'
import { StepCreateNewApp } from './steps/step-create-new-app'
import { StepInputAuthenticationUris } from './steps/step-input-authentication-uris'
import { StepGrantPermissions } from './steps/step-grant-permisions'
import { StepSubmitAppSuccess } from './steps/step-submit-app-success'
import { ModalProps, ModalHeader, Formik, Loader } from '@reapit/elements'
import { Modal, Form } from '@reapit/elements'
import { WizzardStep, WizzardStepComponent } from './types'
import { formFields } from './form-fields'
import { selectSubmitAppLoadingState } from '@/selector/submit-app'
import { validationSchema } from './validation-schema'

const componentMap: Record<WizzardStep, WizzardStepComponent> = {
  BEFORE_YOU_START: StepBeforeYouStart,
  INPUT_APP_NAME: StepInputAppName,
  CREATE_NEW_APP: StepCreateNewApp,
  INPUT_AUTHENTICATION_URIS: StepInputAuthenticationUris,
  GRANT_PERMISSION: StepGrantPermissions,
  SUBMIT_APP_SUCCESS: StepSubmitAppSuccess,
}

const titleMap: Record<WizzardStep, string> = {
  BEFORE_YOU_START: 'Before you start',
  INPUT_APP_NAME: 'App Name',
  CREATE_NEW_APP: 'Create a new app',
  INPUT_AUTHENTICATION_URIS: 'Authentication',
  GRANT_PERMISSION: 'Permissions',
  SUBMIT_APP_SUCCESS: 'Success',
}

const { nameField, redirectUrisField, signoutUrisField, scopesField } = formFields

// next button on step component is a submit button
// will trigger onSubmit to save the state into snapshot -> set value to initialValues of formik
// doing that make the state persist after the <Field> component unmount
// follow offical guide how to implement mutil steps: https://github.com/jaredpalmer/formik/blob/master/examples/MultistepWizard.js
// rerender form on intializeValues change -> set state of current form = initialValues
export const handleUpdateFormState = setFormState => values => {
  setFormState(values)
}

export const SubmitAppWizzard: React.FC<ModalProps> = ({ visible, afterClose }) => {
  const [currentWizzardStep, setWizzardStep] = useState<WizzardStep>('BEFORE_YOU_START')

  const isSubmitAppLoading = useSelector(selectSubmitAppLoadingState)
  const [formState, setFormState] = useState({
    [nameField.name]: '',
    [redirectUrisField.name]: '',
    [signoutUrisField.name]: '',
    [scopesField.name]: [],
  })

  const CurrentStepComponent = componentMap[currentWizzardStep as WizzardStep]
  if (isSubmitAppLoading) {
    return <Loader />
  }

  if (!CurrentStepComponent) {
    return null
  }

  return (
    <Modal renderChildren title={titleMap[currentWizzardStep]} visible={visible} afterClose={afterClose}>
      <Formik
        enableReinitialize={true}
        initialValues={formState}
        onSubmit={() => {}}
        validationSchema={validationSchema}
      >
        <Form>
          <ValidateFormikOnMount />
          <ModalHeader title={titleMap[currentWizzardStep]} afterClose={afterClose} />
          <CurrentStepComponent
            handleUpdateFormState={handleUpdateFormState(setFormState)}
            afterClose={afterClose}
            setWizzardStep={setWizzardStep}
          />
        </Form>
      </Formik>
    </Modal>
  )
}
