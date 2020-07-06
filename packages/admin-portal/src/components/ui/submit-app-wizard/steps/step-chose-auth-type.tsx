import React from 'react'
import styles from '@/styles/blocks/submit-app-wizard.scss?mod'
import { ModalBody, Button, ModalFooter, H5 } from '@reapit/elements'
import { WizardStepComponent, SetWizardStep } from '../types'
import { formFields } from '../form-fields'
import { useFormikContext } from 'formik'
import { wizzardSteps } from '../constant'
import authFlows from '@/constants/app-auth-flow'

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
            <div className={styles.btnChooseAuthTypeContainer}>
              <div>
                <div className={styles.btnChooseAuthTypeContainerLeft}>
                  <Button
                    variant="secondary"
                    className={styles.btnChooseAuthType}
                    onClick={onClientSide(setWizardStep, setFieldValue)}
                  >
                    <b>Client Side</b>
                    <p>
                      Will use Reapit Connect our OAuth provider and will be a web application either a single page
                      application or server rendered site
                    </p>
                  </Button>
                </div>
                <div className={styles.btnChooseAuthTypeContainerRight}>
                  <Button
                    variant="secondary"
                    className={styles.btnChooseAuthType}
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
