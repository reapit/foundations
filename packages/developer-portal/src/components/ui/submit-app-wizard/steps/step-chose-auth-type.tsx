import React from 'react'
import { ModalBody, Button, ModalFooter, H5 } from '@reapit/elements'
import { WizardStepComponent, SetWizardStep } from '../types'
import { formFields } from '../form-fields'
import { useFormikContext } from 'formik'
import { wizzardSteps } from '../constant'
import authFlows from '@/constants/app-auth-flow'
import {
  btnChooseAuthTypeContainer,
  btnChooseAuthTypeContainerLeft,
  btnChooseAuthType,
  btnChooseAuthTypeContainerRight,
} from '../__styles__/submit-app-wizard'

const { authFlowField } = formFields

export const onClientSide = (setWizardStep: SetWizardStep, setFieldValue) => () => {
  setFieldValue(authFlowField.name, authFlows.USER_SESSION)
  setWizardStep(wizzardSteps.INPUT_AUTHENTICATION_URIS)
}

export const onServerSide = (setWizardStep: SetWizardStep, setFieldValue) => () => {
  setFieldValue(authFlowField.name, authFlows.CLIENT_SECRET)
  setWizardStep(wizzardSteps.GRANT_PERMISSION)
}

export const onPrev = (setWizardStep: SetWizardStep) => () => {
  setWizardStep(wizzardSteps.CREATE_NEW_APP)
}

export const StepChoseAuthType: WizardStepComponent = ({ setWizardStep }) => {
  const { setFieldValue } = useFormikContext()
  return (
    <>
      <ModalBody
        body={
          <div>
            <H5>How do you intend to authenticate your app?</H5>
            <div className={btnChooseAuthTypeContainer}>
              <div>
                <div className={btnChooseAuthTypeContainerLeft}>
                  <Button
                    variant="secondary"
                    className={btnChooseAuthType}
                    onClick={onClientSide(setWizardStep, setFieldValue)}
                  >
                    <b>Client Side</b>
                    <p>
                      Will use Reapit Connect our OAuth provider and will be a web application either a single page
                      application or server rendered site
                    </p>
                  </Button>
                </div>
                <div className={btnChooseAuthTypeContainerRight}>
                  <Button
                    variant="secondary"
                    className={btnChooseAuthType}
                    onClick={onServerSide(setWizardStep, setFieldValue)}
                  >
                    <b>Server Side</b>
                    <p>
                      Authenticate using a REST service on the server, typically you are pulling data into an existing
                      application
                    </p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <ModalFooter
        footerItems={
          <Button className="ml-0" variant="secondary" onClick={onPrev(setWizardStep)}>
            Back
          </Button>
        }
      />
    </>
  )
}
