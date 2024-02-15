import { cx } from '@linaria/core'
import { elMr8, Icon } from '@reapit/elements'
import React, { FC } from 'react'
import { AppNewStepId } from './config'
import { useAppState } from '../state/use-app-state'
import { handleSetAppWizardState } from './utils'
import { StepOptionItem, stepOptionItemSelected, StepOptionItemText } from './__styles__'

export const ClientServerSideContent: FC = () => {
  const { appWizardState, setAppWizardState } = useAppState()
  const { nextStep } = appWizardState

  return (
    <>
      <StepOptionItem
        className={cx(elMr8, nextStep === AppNewStepId.clientSideStep && stepOptionItemSelected)}
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.clientSideStep, 'authorisationCode')}
      >
        <Icon className={elMr8} fontSize="2rem" icon="devicesInfographic" />
        <StepOptionItemText>Client Side App</StepOptionItemText>
        {nextStep === AppNewStepId.clientSideStep && <Icon icon="check" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        className={cx(nextStep === AppNewStepId.serverSideStep && stepOptionItemSelected)}
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.serverSideStep)}
      >
        <Icon className={elMr8} fontSize="2rem" icon="serverInfographic" />
        <StepOptionItemText>Server Side Integration</StepOptionItemText>
        {nextStep === AppNewStepId.serverSideStep && <Icon icon="check" intent="primary" />}
      </StepOptionItem>
    </>
  )
}
