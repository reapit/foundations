import { MultiSelectInput, Loader } from '@reapit/elements'
import React, { FC } from 'react'
import { StepFormContainer } from './__styles__'
import { useAppWizard } from './use-app-wizard'
import { appWizardSteps } from './config'
import { useReapitConnect } from '@reapit/connect-session'
import { ScopeModel } from '@reapit/foundations-ts-definitions'
import { getActions, GetActionNames } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'

export const PermissionsOptionsContent: FC = () => {
  const { appWizardState } = useAppWizard()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [permissions, loading] = useReapitGet<ScopeModel[]>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppPermissions],
    fetchWhenTrue: [connectSession],
  })
  const { currentStep } = appWizardState
  const defaultPermissions = (currentStep && appWizardSteps[currentStep].permissions) ?? []

  return (
    <StepFormContainer>
      {loading ? (
        <Loader />
      ) : (
        <MultiSelectInput
          id="select-permissions"
          defaultValues={defaultPermissions}
          options={
            permissions?.map((permission) => ({
              name: permission.description ?? '',
              value: permission.name ?? '',
            })) ?? []
          }
        />
      )}
    </StepFormContainer>
  )
}
