import React from 'react'
import { useSelector } from 'react-redux'
import { ModalBody, Button, DropdownSelect, ModalFooter, H4 } from '@reapit/elements'
import { WizzardStepComponent, SetWizzardStep } from '../types'
import { formFields } from '../form-fields'
import { useFormikContext } from 'formik'
import { selectSubmitAppScopes } from '@/selector/submit-app'

const { scopesField } = formFields

export const onNext = (setWizzardStep: SetWizzardStep, handleUpdateFormState: Function, values) => () => {
  handleUpdateFormState(values)

  // change step will render a difference step -> lead to input unmount and its state = ""
  // happen before submitForm
  setWizzardStep('SUBMIT_APP_SUCCESS')
}
export const onPrev = (setWizzardStep: SetWizzardStep) => () => {
  setWizzardStep('BEFORE_YOU_START')
}

export const preprareScopeOptions = scopes => {
  return scopes.map(scope => {
    const { name, description } = scope

    return {
      label: description,
      value: name,
    }
  })
}

export const StepGrantPermissions: WizzardStepComponent = ({ setWizzardStep, handleUpdateFormState }) => {
  const { values, errors } = useFormikContext()
  const isDataInvalid = Boolean(errors[scopesField.name])

  const scopes = useSelector(selectSubmitAppScopes)

  const scopeOptions = preprareScopeOptions(scopes)

  return (
    <>
      <ModalBody
        body={
          <div>
            <H4>What type of data are you interested in?</H4>
            <p>
              Please select specific the entities you need access to on a read or write basis. You can select multiple
              options below:
            </p>
            <DropdownSelect
              mode="multiple"
              options={scopeOptions}
              name={scopesField.name}
              id={scopesField.name}
              fixedPosition
            />
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
