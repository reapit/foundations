import { elMb10, InputGroup } from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { UseFormRegister, DeepMap, FieldError } from 'react-hook-form'
import { CreateAppFormSchema } from '.'
import { AppNewStepId } from './config'
import { AppWizardState, useAppState } from '../state/use-app-state'
import { StepFormContainer } from './__styles__'

interface AuthOptionsContentProps {
  register: UseFormRegister<CreateAppFormSchema>
  errors: DeepMap<Partial<CreateAppFormSchema>, FieldError>
}

export const handleSetAppWizardState = (setAppWizardState: Dispatch<SetStateAction<AppWizardState>>) => () => {
  if (setAppWizardState) {
    setAppWizardState((currentState) => ({
      ...currentState,
      nextStep: AppNewStepId.permissionsStep,
    }))
  }
}

export const AuthOptionsContent: FC<AuthOptionsContentProps> = ({ register, errors }) => {
  const { setAppWizardState } = useAppState()

  useEffect(handleSetAppWizardState(setAppWizardState), [])

  return (
    <StepFormContainer>
      <InputGroup
        className={elMb10}
        label="Login Redirect URI"
        type="text"
        {...register('redirectUris')}
        defaultValue="http://localhost:8080"
        inputAddOnText={errors?.redirectUris?.message}
        intent="danger"
      />
      <InputGroup
        label="Logout Redirect URI"
        type="text"
        {...register('signoutUris')}
        defaultValue="http://localhost:8080/login"
        inputAddOnText={errors?.signoutUris?.message}
        intent="danger"
      />
    </StepFormContainer>
  )
}
