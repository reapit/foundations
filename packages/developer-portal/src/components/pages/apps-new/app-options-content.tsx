import { cx } from '@linaria/core'
import { elMr8, elWFull, Icon } from '@reapit/elements'
import React, { FC } from 'react'
import { AppNewStepId } from './config'
import { useAppWizard } from './use-app-wizard'
import { handleSetAppWizardState } from './utils'
import { StepOptionItem, stepOptionItemSelected } from './__styles__'

export const AppOptionsContent: FC = () => {
  const { appWizardState, setAppWizardState } = useAppWizard()
  const { nextStep } = appWizardState

  return (
    <>
      <StepOptionItem
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.agencyCloudStep, 'authorisationCode')}
      >
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.agencyCloudStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="logoSettingsInfographic"
        />
        <div className={elWFull}>AgencyCloud Functionality</div>
        {nextStep === AppNewStepId.agencyCloudStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.externalAppStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.externalAppStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="userHouseInfographic"
        />
        <div className={elWFull}>Create an External Web Application</div>
        {nextStep === AppNewStepId.externalAppStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.dataFeedStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.dataFeedStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="feedInfographic"
        />
        <div className={elWFull}>Data / Portal / Reporting Feed</div>
        {nextStep === AppNewStepId.dataFeedStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.websiteFeedStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.websiteFeedStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="feedAltInfographic"
        />
        <div className={elWFull}>Webside Feed</div>
        {nextStep === AppNewStepId.websiteFeedStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.webServicesStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.webServicesStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="globeInfographic"
        />
        <div className={elWFull}>WebServices to Foundations Migration</div>
        {nextStep === AppNewStepId.webServicesStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.reapitConnectStep, 'authorisationCode')}
      >
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
