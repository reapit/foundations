import { cx } from '@linaria/core'
import { elFadeIn, elWFull, FlexContainer } from '@reapit/elements'
import React, { FC } from 'react'
import { DeepMap, FieldError, UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { AppTypeOptionsContent } from './app-type-options-content'
import { CreateAppFormSchema } from './apps-new'
import { AuthOptionsContent } from './auth-options-content'
import { AppNewStepId } from './config'
import { PermissionsOptionsContent } from './permissions-options-content'
import { useAppWizard } from './use-app-wizard'
import { UserOptionsContent } from './user-options-content'

interface StepOptionsContentProps {
  register: UseFormRegister<CreateAppFormSchema>
  getValues: UseFormGetValues<CreateAppFormSchema>
  errors: DeepMap<Partial<CreateAppFormSchema>, FieldError>
}

export const StepOptionsContent: FC<StepOptionsContentProps> = ({ register, errors, getValues }) => {
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
      {currentStep === AppNewStepId.agencyCloudStep && (
        <AuthOptionsContent register={register} errors={errors} getValues={getValues} />
      )}
      {currentStep === AppNewStepId.agencyCloudReplacementStep && (
        <AuthOptionsContent register={register} errors={errors} getValues={getValues} />
      )}
      {currentStep === AppNewStepId.dataFeedStep && (
        <PermissionsOptionsContent register={register} getValues={getValues} />
      )}
      {currentStep === AppNewStepId.reportingStep && (
        <PermissionsOptionsContent register={register} getValues={getValues} />
      )}
      {currentStep === AppNewStepId.serverSideStep && (
        <PermissionsOptionsContent register={register} getValues={getValues} />
      )}
      {currentStep === AppNewStepId.clientSideStep && (
        <AuthOptionsContent register={register} errors={errors} getValues={getValues} />
      )}
      {currentStep === AppNewStepId.websiteFeedStep && (
        <PermissionsOptionsContent register={register} getValues={getValues} />
      )}
      {currentStep === AppNewStepId.permissionsStep && (
        <PermissionsOptionsContent register={register} getValues={getValues} />
      )}
    </FlexContainer>
  )
}
