import React from 'react'
import { ValidateFormikOnMount } from '../utils'
import { ModalBody, Button, Input, ModalFooter } from '@reapit/elements'
import { WizardStepComponent, SetWizardStep } from '../types'
import { formFields } from '../form-fields'
import { useFormikContext } from 'formik'

const { nameField } = formFields

export const onNext = (setWizardStep: SetWizardStep) => () => {
  setWizardStep('CREATE_NEW_APP')
}
export const onPrev = (setWizardStep: SetWizardStep) => () => {
  setWizardStep('BEFORE_YOU_START')
}

export const StepInputAppName: WizardStepComponent = ({ setWizardStep }) => {
  const { isValid } = useFormikContext()

  return (
    <>
      <ValidateFormikOnMount />
      <ModalBody
        body={
          <div>
            <p className="mb-2">Your app name as it will display to users</p>
            <Input placeholder={nameField.placeHolder} type="text" id={nameField.name} name={nameField.name} />
          </div>
        }
      />
      <ModalFooter
        footerItems={
          <>
            <Button onClick={onPrev(setWizardStep)}>Back</Button>
            <Button disabled={!isValid} onClick={onNext(setWizardStep)}>
              Next
            </Button>
          </>
        }
      />
    </>
  )
}
