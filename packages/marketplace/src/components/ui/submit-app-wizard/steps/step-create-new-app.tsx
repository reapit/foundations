import React from 'react'
import { ModalBody, Button, H4, ModalFooter, FlexContainerBasic } from '@reapit/elements'
import { WizardStepComponent, SetWizardStep } from '../types'
import { useFormikContext } from 'formik'
import { formFields } from '../form-fields'

const { authFlowField } = formFields

export const onPrev = (setWizardStep: SetWizardStep) => () => {
  setWizardStep('INPUT_APP_NAME')
}

export const onLauchWithinAgencyCloud = (setWizardStep: SetWizardStep, setFieldValue) => () => {
  setFieldValue(authFlowField.name, 'Authorisation Code')
  setWizardStep('INPUT_AUTHENTICATION_URIS')
}

export const StepCreateNewApp: WizardStepComponent = ({ setWizardStep }) => {
  const { setFieldValue } = useFormikContext()
  return (
    <>
      <ModalBody
        body={
          <div>
            <H4>Do you intend for your app to be launched within Agency Cloud?</H4>
            <p>
              If you want your application to be launched within the Desktop CRM you will need to adhere to our branding
              guidelines. The easiest way to do this is to use Elements our UI Library or style sheet. You will also be
              required to use Reapit Connect, our single sign on solution. For more information please click here{' '}
            </p>
          </div>
        }
      />
      <ModalFooter
        footerItems={
          <FlexContainerBasic>
            <div>
              <Button onClick={onLauchWithinAgencyCloud(setWizardStep, setFieldValue)}>Yes</Button>
              {/* TBC flow 2 */}
              <Button>No</Button>
            </div>
            <div className="ml-auto">
              <Button onClick={onPrev(setWizardStep)}>Back</Button>
            </div>
          </FlexContainerBasic>
        }
      />
    </>
  )
}
