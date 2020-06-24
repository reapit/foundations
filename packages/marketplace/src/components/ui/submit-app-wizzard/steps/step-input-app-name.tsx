import React from 'react'
import { ModalBody, Button, Input, ModalFooter } from '@reapit/elements'
import { WizzardStepComponent, SetWizzardStep } from '../types'
import { formFields } from '../form-fields'
import { useFormikContext } from 'formik'

const { nameField } = formFields

export const onNext = (setWizzardStep: SetWizzardStep, handleUpdateFormState: Function, values) => () => {
  handleUpdateFormState(values)

  // change step will render a difference step -> lead to input unmount and its state = ""
  // happen before submitForm
  setWizzardStep('CREATE_NEW_APP')
}
export const onPrev = (setWizzardStep: SetWizzardStep) => () => {
  setWizzardStep('BEFORE_YOU_START')
}

export const StepInputAppName: WizzardStepComponent = ({ setWizzardStep, handleUpdateFormState }) => {
  const { errors, values } = useFormikContext()
  const isDataInvalid = Boolean(errors[nameField.name])

  return (
    <>
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
            <Button onClick={onPrev(setWizzardStep)}>Back</Button>
            <Button disabled={isDataInvalid} onClick={onNext(setWizzardStep, handleUpdateFormState, values)}>
              Next
            </Button>
          </>
        }
      />
    </>
  )
}
