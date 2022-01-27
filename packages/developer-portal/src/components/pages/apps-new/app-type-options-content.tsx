import { cx } from '@linaria/core'
import { elMr8, elWFull, Icon } from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { AppNewStepId, AppAuthFlow } from './config'
import { AppWizardState, useAppWizard } from './use-app-wizard'
import { StepOptionItem, stepOptionItemSelected } from './__styles__'

export const handleSetAppWizardState =
  (setAppWizardState: Dispatch<SetStateAction<AppWizardState>>, nextStep: AppNewStepId, authFlow: AppAuthFlow) =>
  () => {
    setAppWizardState((currentState) => ({
      ...currentState,
      nextStep,
      authFlow,
    }))
  }

export const AppTypeOptionsContent: FC = () => {
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
      <StepOptionItem
        onClick={handleSetAppWizardState(
          setAppWizardState,
          AppNewStepId.agencyCloudReplacementStep,
          'authorisationCode',
        )}
      >
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.agencyCloudReplacementStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="refreshInfographic"
        />
        <div className={elWFull}>Replace an AgencyCloud Screen</div>
        {nextStep === AppNewStepId.agencyCloudReplacementStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.dataFeedStep, 'clientCredentials')}
      >
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.dataFeedStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="feedInfographic"
        />
        <div className={elWFull}>Data/Portal Feed</div>
        {nextStep === AppNewStepId.dataFeedStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.reportingStep, 'clientCredentials')}
      >
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.reportingStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="reportingInfographic"
        />
        <div className={elWFull}>Reporting</div>
        {nextStep === AppNewStepId.reportingStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.serverSideStep, 'clientCredentials')}
      >
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
      <StepOptionItem
        onClick={handleSetAppWizardState(setAppWizardState, AppNewStepId.websiteFeedStep, 'clientCredentials')}
      >
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.websiteFeedStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="feedAltInfographic"
        />
        <div className={elWFull}>Webside Feed</div>
        {nextStep === AppNewStepId.websiteFeedStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
    </>
  )
}
