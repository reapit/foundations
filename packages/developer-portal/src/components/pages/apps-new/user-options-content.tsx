import { cx } from '@linaria/core'
import { elMr8, elWFull, Icon } from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { AppNewStepId } from './config'
import { AppWizardState, useAppWizard } from './use-app-wizard'
import { StepOptionItem, stepOptionItemSelected } from './__styles__'

export const handleSetAppWizardState =
  (setAppWizardState: Dispatch<SetStateAction<AppWizardState>>, nextStep: AppNewStepId) => () => {
    setAppWizardState((currentState) => ({
      ...currentState,
      nextStep,
    }))
  }

export const UserOptionsContent: FC = () => {
  const { appWizardState, setAppWizardState } = useAppWizard()
  const { nextStep } = appWizardState

  return (
    <>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.existingCustomerStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.existingCustomerStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="logoKeyInfographic"
        />
        <div className={elWFull}>Existing Reapit Customer</div>
        {nextStep === AppNewStepId.existingCustomerStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.thirdPartyDevStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.thirdPartyDevStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="htmlInfographic"
        />
        <div className={elWFull}>3rd Party Web Developer</div>
        {nextStep === AppNewStepId.thirdPartyDevStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.webServicesStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.webServicesStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="globeInfographic"
        />
        <div className={elWFull}>WebService to Foundations</div>
        {nextStep === AppNewStepId.webServicesStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.reapitConnectStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.reapitConnectStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="doorLockInfographic"
        />
        <div className={elWFull}>Reapit Connect as ID Provider</div>
        {nextStep === AppNewStepId.reapitConnectStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.otherAppStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.otherAppStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="userHouseInfographic"
        />
        <div className={elWFull}>Other</div>
        {nextStep === AppNewStepId.otherAppStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
    </>
  )
}
