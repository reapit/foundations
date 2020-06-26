import React from 'react'
import styles from '@/styles/blocks/submit-app-wizzard.scss?mod'
import { ModalBody, Button, ModalFooter, H4 } from '@reapit/elements'
import { WizardStepComponent, SetWizardStep } from '../types'
import { formFields } from '../form-fields'
import { useFormikContext } from 'formik'

const { authFlowField } = formFields

export const onClientSide = (setWizardStep: SetWizardStep, setFieldValue) => () => {
  setFieldValue(authFlowField.name, 'authorisationCode')
  setWizardStep('INPUT_AUTHENTICATION_URIS')
}

export const onServerSide = (setWizardStep: SetWizardStep, setFieldValue) => () => {
  setFieldValue(authFlowField.name, 'clientCredentials')
  setWizardStep('GRANT_PERMISSION')
}

export const onPrev = (setWizardStep: SetWizardStep) => () => {
  setWizardStep('CREATE_NEW_APP')
}

export const StepChoseAuthType: WizardStepComponent = ({ setWizardStep }) => {
  const { setFieldValue } = useFormikContext()
  return (
    <>
      <ModalBody
        body={
          <div>
            <H4>How do you intend to authenticate your app?</H4>
            <p className="mb-2">Please select</p>
            <div>
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
        }
      />
      <ModalFooter
        footerItems={
          <>
            <Button onClick={onPrev(setWizardStep)}>Back</Button>
          </>
        }
      />
    </>
  )
}
