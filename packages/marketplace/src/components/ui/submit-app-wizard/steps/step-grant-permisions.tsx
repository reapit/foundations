import React from 'react'
import { useSelector } from 'react-redux'
import { ModalBody, Button, DropdownSelect, ModalFooter, H4, SelectOption } from '@reapit/elements'
import { WizardStepComponent, SetWizardStep } from '../types'
import { formFields } from '../form-fields'
import { useFormikContext } from 'formik'
import { selectSubmitAppScopes } from '@/selector/submit-app'
import { ScopeModel } from '@/types/marketplace-api-schema'

const { scopesField } = formFields

export const onNext = (setWizardStep: SetWizardStep) => () => {
  setWizardStep('SUBMIT_APP_SUCCESS')
}
export const onPrev = (setWizardStep: SetWizardStep) => () => {
  setWizardStep('BEFORE_YOU_START')
}

export const preprareScopeOptions: (scopes: ScopeModel[]) => SelectOption[] = scopes =>
  scopes.map(scope => {
    const { name, description } = scope

    return {
      label: description,
      value: name,
    } as SelectOption
  })

export const StepGrantPermissions: WizardStepComponent = ({ setWizardStep }) => {
  const { isValid } = useFormikContext()

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
