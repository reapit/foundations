import { cx } from '@linaria/core'
import { elMr8, Icon } from '@reapit/elements'
import React, { FC } from 'react'
import { AppNewStepId } from './config'
import { useAppState } from '../state/use-app-state'
import { handleSetAppWizardState } from './utils'
import { StepOptionItem, stepOptionItemSelected, StepOptionItemText } from './__styles__'

export const AppOptionsContent: FC = () => {
  const { appWizardState, setAppWizardState } = useAppState()
  const { nextStep } = appWizardState

  return (
    <>
      <StepOptionItem
        className={cx(nextStep === AppNewStepId.agencyCloudStep && stepOptionItemSelected)}
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.agencyCloudStep, 'authorisationCode')}
      >
        <Icon className={elMr8} fontSize="2rem" icon="logoSettingsInfographic" />
        <StepOptionItemText>Reapit CRM Functionality</StepOptionItemText>
        {nextStep === AppNewStepId.agencyCloudStep && <Icon icon="check" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        className={cx(nextStep === AppNewStepId.externalAppStep && stepOptionItemSelected)}
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.externalAppStep)}
      >
        <Icon className={elMr8} fontSize="2rem" icon="userHouseInfographic" />
        <StepOptionItemText>Create an External Web Application</StepOptionItemText>
        {nextStep === AppNewStepId.externalAppStep && <Icon icon="check" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        className={cx(nextStep === AppNewStepId.dataFeedStep && stepOptionItemSelected)}
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.dataFeedStep)}
      >
        <Icon className={elMr8} fontSize="2rem" icon="feedInfographic" />
        <StepOptionItemText>Data / Portal / Reporting Feed</StepOptionItemText>
        {nextStep === AppNewStepId.dataFeedStep && <Icon icon="check" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        className={cx(nextStep === AppNewStepId.websiteFeedStep && stepOptionItemSelected)}
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.websiteFeedStep)}
      >
        <Icon className={elMr8} fontSize="2rem" icon="feedAltInfographic" />
        <StepOptionItemText>Website Feed</StepOptionItemText>
        {nextStep === AppNewStepId.websiteFeedStep && <Icon icon="check" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        className={cx(nextStep === AppNewStepId.webServicesStep && stepOptionItemSelected)}
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.webServicesStep)}
      >
        <Icon className={elMr8} fontSize="2rem" icon="globeInfographic" />
        <StepOptionItemText>WebServices to Platform</StepOptionItemText>
        {nextStep === AppNewStepId.webServicesStep && <Icon icon="check" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        className={cx(nextStep === AppNewStepId.reapitConnectStep && stepOptionItemSelected)}
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.reapitConnectStep, 'authorisationCode')}
      >
        <Icon className={elMr8} fontSize="2rem" icon="doorLockInfographic" />
        <StepOptionItemText>Reapit Connect as ID Provider</StepOptionItemText>
        {nextStep === AppNewStepId.reapitConnectStep && <Icon icon="check" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        className={cx(nextStep === AppNewStepId.clientSideStep && stepOptionItemSelected)}
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
