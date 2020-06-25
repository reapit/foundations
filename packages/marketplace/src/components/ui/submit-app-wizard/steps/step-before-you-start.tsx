import React from 'react'
import { ModalBody, ModalFooter, H4, Button } from '@reapit/elements'
import { useHistory } from 'react-router'
import { History } from 'history'
import Routes from '@/constants/routes'
import { WizardStepComponent, SetWizardStep } from '../types'

export const onViewDocs = (history: History<unknown>) => () =>
  history.push(`${Routes.DEVELOPER_API_DOCS}/developer-portal`)

export const onCreateNewApp = (setWizardStep: SetWizardStep) => () => {
  setWizardStep('INPUT_APP_NAME')
}

export const StepBeforeYouStart: WizardStepComponent = ({ setWizardStep }) => {
  const history = useHistory()

  return (
    <>
      <ModalBody
        body={
          <div>
            <H4>Have you had a look at the documentation?</H4>
            <p>
              Before continuing with registering your app, we strongly advise that you read the &quot;Step-by-step&quot;
              guide on how best to complete the following form.
            </p>
          </div>
        }
      />
      <ModalFooter
        footerItems={
          <>
            <Button onClick={onViewDocs(history)}>View Docs</Button>
            <Button onClick={onCreateNewApp(setWizardStep)}>Create New App</Button>
          </>
        }
      />
    </>
  )
}
