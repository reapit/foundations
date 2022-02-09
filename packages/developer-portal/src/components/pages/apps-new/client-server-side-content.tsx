import { cx } from '@linaria/core'
import { elMr8, elWFull, Icon } from '@reapit/elements'
import React, { FC } from 'react'
import { AppNewStepId } from './config'
import { useAppWizard } from './use-app-wizard'
import { handleSetAppWizardState } from './utils'
import { StepOptionItem, stepOptionItemSelected } from './__styles__'

export const ClientServerSideContent: FC = () => {
  const { appWizardState, setAppWizardState } = useAppWizard()
  const { nextStep } = appWizardState

  return (
    <>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.serverSideStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.serverSideStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="serverInfographic"
        />
        <div className={elWFull}>Server Side</div>
        {nextStep === AppNewStepId.serverSideStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.clientSideStep, 'authorisationCode')}
      >
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.clientSideStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="devicesInfographic"
        />
        <div className={elWFull}>Client Side</div>
        {nextStep === AppNewStepId.clientSideStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
    </>
  )
}
