import { cx } from '@linaria/core'
import { elMr8, Icon } from '@reapit/elements'
import React, { FC } from 'react'
import { AppNewStepId } from './config'
import { useAppWizard } from './use-app-wizard'
import { handleSetAppWizardState } from './utils'
import { StepOptionItem, stepOptionItemSelected, StepOptionItemText } from './__styles__'

export const AppOptionsContent: FC = () => {
  const { appWizardState, setAppWizardState } = useAppWizard()
  const { nextStep } = appWizardState

  return (
    <>
      <StepOptionItem
        className={cx(nextStep === AppNewStepId.agencyCloudStep && stepOptionItemSelected)}
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.agencyCloudStep, 'authorisationCode')}
      >
        <Icon className={elMr8} fontSize="2rem" icon="logoSettingsInfographic" />
        <StepOptionItemText>AgencyCloud Functionality</StepOptionItemText>
        {nextStep === AppNewStepId.agencyCloudStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        className={cx(nextStep === AppNewStepId.externalAppStep && stepOptionItemSelected)}
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.externalAppStep)}
      >
        <Icon className={elMr8} fontSize="2rem" icon="userHouseInfographic" />
        <StepOptionItemText>Create an External Web Application</StepOptionItemText>
        {nextStep === AppNewStepId.externalAppStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        className={cx(nextStep === AppNewStepId.dataFeedStep && stepOptionItemSelected)}
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.dataFeedStep)}
      >
        <Icon className={elMr8} fontSize="2rem" icon="feedInfographic" />
        <StepOptionItemText>Data / Portal / Reporting Feed</StepOptionItemText>
        {nextStep === AppNewStepId.dataFeedStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        className={cx(nextStep === AppNewStepId.websiteFeedStep && stepOptionItemSelected)}
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.websiteFeedStep)}
      >
        <Icon className={elMr8} fontSize="2rem" icon="feedAltInfographic" />
        <StepOptionItemText>Webside Feed</StepOptionItemText>
        {nextStep === AppNewStepId.websiteFeedStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        className={cx(nextStep === AppNewStepId.webServicesStep && stepOptionItemSelected)}
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.webServicesStep)}
      >
        <Icon className={elMr8} fontSize="2rem" icon="globeInfographic" />
        <StepOptionItemText>WebServices to Foundations Migration</StepOptionItemText>
        {nextStep === AppNewStepId.webServicesStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        className={cx(nextStep === AppNewStepId.reapitConnectStep && stepOptionItemSelected)}
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.reapitConnectStep, 'authorisationCode')}
      >
        <Icon className={elMr8} fontSize="2rem" icon="doorLockInfographic" />
        <StepOptionItemText>Reapit Connect as ID Provider</StepOptionItemText>
        {nextStep === AppNewStepId.reapitConnectStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        className={cx(nextStep === AppNewStepId.otherAppStep && stepOptionItemSelected)}
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.otherAppStep)}
      >
        <Icon className={elMr8} fontSize="2rem" icon="userHouseInfographic" />
        <StepOptionItemText>Other</StepOptionItemText>
        {nextStep === AppNewStepId.otherAppStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
    </>
  )
}
