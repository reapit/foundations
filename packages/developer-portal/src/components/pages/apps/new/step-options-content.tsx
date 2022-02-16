import { cx } from '@linaria/core'
import { elFadeIn, elWFull, FlexContainer } from '@reapit/elements'
import React, { FC } from 'react'
import { DeepMap, FieldError, UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { AppOptionsContent } from './app-options-content'
import { CreateAppFormSchema } from './apps-new'
import { AuthOptionsContent } from './auth-options-content'
import { ClientServerSideContent } from './client-server-side-content'
import { AppNewStepId } from './config'
import { PermissionsOptionsContent } from './permissions-options-content'
import { useAppWizard } from './use-app-wizard'

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
      {currentStep === AppNewStepId.applicationTypeStep && <AppOptionsContent />}
      {currentStep === AppNewStepId.agencyCloudStep && <AuthOptionsContent register={register} errors={errors} />}
      {currentStep === AppNewStepId.otherAppStep && <ClientServerSideContent />}
      {currentStep === AppNewStepId.externalAppStep && <ClientServerSideContent />}
      {currentStep === AppNewStepId.dataFeedStep && (
        <PermissionsOptionsContent register={register} getValues={getValues} />
      )}
      {currentStep === AppNewStepId.websiteFeedStep && (
        <PermissionsOptionsContent register={register} getValues={getValues} />
      )}
      {currentStep === AppNewStepId.webServicesStep && <ClientServerSideContent />}
      {currentStep === AppNewStepId.reapitConnectStep && <AuthOptionsContent register={register} errors={errors} />}
      {currentStep === AppNewStepId.serverSideStep && (
        <PermissionsOptionsContent register={register} getValues={getValues} />
      )}
      {currentStep === AppNewStepId.clientSideStep && <AuthOptionsContent register={register} errors={errors} />}
      {currentStep === AppNewStepId.permissionsStep && (
        <PermissionsOptionsContent register={register} getValues={getValues} />
      )}
    </FlexContainer>
  )
}
