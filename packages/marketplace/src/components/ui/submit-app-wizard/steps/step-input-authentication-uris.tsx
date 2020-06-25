import React from 'react'
import { ModalBody, Button, Input, ModalFooter } from '@reapit/elements'
import { WizardStepComponent, SetWizardStep } from '../types'
import { formFields } from '../form-fields'
import { useFormikContext } from 'formik'

const { redirectUrisField, signoutUrisField } = formFields

export const onNext = (setWizardStep: SetWizardStep) => () => {
  setWizardStep('GRANT_PERMISSION')
}
export const onPrev = (setWizardStep: SetWizardStep) => () => {
  setWizardStep('CREATE_NEW_APP')
}

export const StepInputAuthenticationUris: WizardStepComponent = ({ setWizardStep }) => {
  const { isValid } = useFormikContext()

  return (
    <>
      <ModalBody
        body={
          <div>
            <p className="mb-3">
              Please now register one or more Redirect URLs and a Sign Out URL to allow Reapit - Connect to direct
              traffic back to your application in a secure way.
            </p>
            <Input
              type="text"
              id={redirectUrisField.name}
              placeholder={redirectUrisField.placeHolder}
              name={redirectUrisField.name}
              labelText={redirectUrisField.label}
              helperText="Please enter a Redirect URI(s) to define the route Reapit Connect is permitted to redirect to after a successful authentication. The following formats are supported: https://, http:// (for localhost only) or your own custom URI schemes such as myapp://login. For multiple URI’s, separate using a comma."
            />
            <Input
              type="text"
              id={signoutUrisField.name}
              placeholder={signoutUrisField.placeHolder}
              name={signoutUrisField.name}
              labelText={signoutUrisField.label}
              helperText="Please enter a Sign Out URI(s) to define the route Reapit Connect is permitted to redirect to after successfully logging out. The following formats are supported: https://, http:// (for localhost only) or your own custom URI schemes such as myapp://login. For multiple URI’s, separate using a comma."
            />
          </div>
        }
      />
      <ModalFooter
        footerItems={
          <>
            <Button onClick={onPrev(setWizardStep)}>Back</Button>
            <Button type="submit" disabled={!isValid} onClick={onNext(setWizardStep)}>
              Next
            </Button>
          </>
        }
      />
    </>
  )
}
