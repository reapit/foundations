import { cx } from '@linaria/core'
import { elFadeIn, elWFull, FlexContainer } from '@reapit/elements'
import React, { FC } from 'react'
import { AppTypeOptionsContent } from './app-type-options-content'
import { AuthOptionsContent } from './auth-options-content'
import { AppNewStepId } from './config'
import { PermissionsOptionsContent } from './permissions-options-content'
import { useAppWizard } from './use-app-wizard'
import { UserOptionsContent } from './user-options-content'

export const StepOptionsContent: FC = () => {
  const { appWizardState } = useAppWizard()
  const { currentStep } = appWizardState

  return (
    <FlexContainer className={cx(elWFull, elFadeIn)} isFlexColumn>
      {currentStep === AppNewStepId.whatUserStep && <UserOptionsContent />}
      {currentStep === AppNewStepId.existingCustomerStep && <AppTypeOptionsContent />}
      {currentStep === AppNewStepId.thirdPartyDevStep && <AppTypeOptionsContent />}
      {currentStep === AppNewStepId.webServicesStep && <AppTypeOptionsContent />}
      {currentStep === AppNewStepId.reapitConnectStep && <AppTypeOptionsContent />}
      {currentStep === AppNewStepId.otherAppStep && <AppTypeOptionsContent />}
      {currentStep === AppNewStepId.agencyCloudStep && <AuthOptionsContent />}
      {currentStep === AppNewStepId.agencyCloudReplacementStep && <AuthOptionsContent />}
      {currentStep === AppNewStepId.dataFeedStep && <PermissionsOptionsContent />}
      {currentStep === AppNewStepId.reportingStep && <PermissionsOptionsContent />}
      {currentStep === AppNewStepId.serverSideStep && <PermissionsOptionsContent />}
      {currentStep === AppNewStepId.clientSideStep && <AuthOptionsContent />}
      {currentStep === AppNewStepId.websiteFeedStep && <PermissionsOptionsContent />}
      {currentStep === AppNewStepId.permissionsStep && <PermissionsOptionsContent />}
    </FlexContainer>
  )
}
