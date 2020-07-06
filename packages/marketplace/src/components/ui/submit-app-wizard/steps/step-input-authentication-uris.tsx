import React from 'react'
import { ModalBody, Button, Input, ModalFooter, FlexContainerBasic, Content } from '@reapit/elements'
import { WizardStepComponent, SetWizardStep } from '../types'
import { formFields } from '../form-fields'
import { useFormikContext } from 'formik'
import { CustomCreateAppModel } from '@/actions/submit-app'
import { ValidateFormikOnMount } from '../utils'
import { wizzardSteps } from '../constant'

const { redirectUrisField, signoutUrisField, directApiField } = formFields

export const onNext = (setWizardStep: SetWizardStep) => () => {
  setWizardStep(wizzardSteps.GRANT_PERMISSION)
}
export const onPrev = (setWizardStep: SetWizardStep, isDirectApi: boolean) => () => {
  // flow 2, 3
  if (!isDirectApi) {
    setWizardStep(wizzardSteps.CREATE_NEW_APP)
    return
  }

  // flow 1, step 4: https://github.com/reapit/foundations/issues/1785
  setWizardStep(wizzardSteps.INPUT_ATHENTICATION_TYPE)
}

export const StepInputAuthenticationUris: WizardStepComponent = ({ setWizardStep }) => {
  const { isValid, values } = useFormikContext<CustomCreateAppModel>()
  const isDirectApi = Boolean(values[directApiField.name])

  return (
    <>
      <ValidateFormikOnMount />
      <ModalBody
        body={
          <div>
            <Content>
              <p>
                Please now register one or more Redirect URIs and a Sign Out URI to allow Reapit - Connect to direct
                traffic back to your application in a secure way.
              </p>
              <p>
                For the fields below, the following formats are supported: https://, http:// (for localhost only) or
                your own custom URI schemes such as myapp://login.
              </p>
            </Content>
            <p className="mb-3">For multiple URI’s, separate using a comma.</p>
            <Input
              type="text"
              id={redirectUrisField.name}
              placeholder={redirectUrisField.placeHolder}
              name={redirectUrisField.name}
              labelText={redirectUrisField.label}
              helperText={
                <Content>
                  <p>
                    Please enter a Redirect URI(s) to define the route Reapit Connect is permitted to redirect to after
                    a successful authentication.
                  </p>
                </Content>
              }
            />
            <Input
              type="text"
              id={signoutUrisField.name}
              placeholder={signoutUrisField.placeHolder}
              name={signoutUrisField.name}
              labelText={signoutUrisField.label}
              helperText={
                <Content>
                  <p>
                    Please enter a Sign Out URI(s) to define the route Reapit Connect is permitted to redirect to after
                    successfully logging out.
                  </p>
                </Content>
              }
            />
          </div>
        }
      />
      <ModalFooter
        footerItems={
          <FlexContainerBasic>
            <Button className="ml-0" variant="secondary" onClick={onPrev(setWizardStep, isDirectApi)}>
              Back
            </Button>
            <Button className="ml-auto" type="submit" disabled={!isValid} onClick={onNext(setWizardStep)}>
              Next
            </Button>
          </FlexContainerBasic>
        }
      />
    </>
  )
}
