import React from 'react'
import { ModalBody, ModalFooter, H5, Button, ButtonGroup } from '@reapit/elements'
import { History } from 'history'
import Routes from '@/constants/routes'
import { WizardStepComponent, SetWizardStep } from '../types'
import { wizzardSteps } from '../constant'

export const onViewDocs = (history: History<unknown>) => () => history.push(`${Routes.API_DOCS}/developer-portal`)

export const onCreateNewApp = (setWizardStep: SetWizardStep) => () => {
  setWizardStep(wizzardSteps.INPUT_APP_NAME)
}

export const StepBeforeYouStart: WizardStepComponent = ({ setWizardStep }) => {
  return (
    <>
      <ModalBody
        body={
          <div>
            <H5>Have you had a look at the documentation?</H5>
            <p>
              Before continuing with registering your app, we strongly advise that you read the &quot;Step-by-step&quot;
              guide on how best to complete the following form.
            </p>
          </div>
        }
      />
      <ModalFooter
        footerItems={
          <ButtonGroup hasSpacing isCentered>
            <a
              className="button is-secondary"
              href={`${Routes.API_DOCS}/developer-portal`}
              rel="noreferrer"
              target="_blank"
            >
              View Docs
            </a>
            <Button onClick={onCreateNewApp(setWizardStep)}>Create New App</Button>
          </ButtonGroup>
        }
      />
    </>
  )
}
