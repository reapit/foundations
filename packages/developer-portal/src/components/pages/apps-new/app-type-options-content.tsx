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

export const AppTypeOptionsContent: FC = () => {
  const { appWizardState, setAppWizardState } = useAppWizard()
  const { nextStep } = appWizardState

  return (
    <>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.agencyCloudStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.agencyCloudStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="logoKeyInfographic"
        />
        <div className={elWFull}>AgencyCloud Functionality</div>
        {nextStep === AppNewStepId.agencyCloudStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.agencyCloudReplacementStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.agencyCloudReplacementStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="htmlInfographic"
        />
        <div className={elWFull}>Replace an AgencyCloud Screen</div>
        {nextStep === AppNewStepId.agencyCloudReplacementStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.dataFeedStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.dataFeedStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="globeInfographic"
        />
        <div className={elWFull}>Data/Portal Feed</div>
        {nextStep === AppNewStepId.dataFeedStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.reportingStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.reportingStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="doorLockInfographic"
        />
        <div className={elWFull}>Reporting</div>
        {nextStep === AppNewStepId.reportingStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.serverSideStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.serverSideStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="userHouseInfographic"
        />
        <div className={elWFull}>Server Side</div>
        {nextStep === AppNewStepId.serverSideStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.clientSideStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.clientSideStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="userHouseInfographic"
        />
        <div className={elWFull}>Client Side</div>
        {nextStep === AppNewStepId.clientSideStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.websiteFeedStep)}>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.websiteFeedStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="userHouseInfographic"
        />
        <div className={elWFull}>Webside Feed</div>
        {nextStep === AppNewStepId.websiteFeedStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
    </>
  )
}
