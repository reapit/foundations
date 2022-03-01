import React, { FC } from 'react'
import { Control, DeepMap, FieldError, UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { AcIntegrationTab } from './ac-integration-tab'
import { AppListingTab } from './app-listing-tab'
import { AppPipeline } from './app-pipeline'
import { AuthenticationTab } from './authentication-tab'
import { AppEditFormSchema } from './form-schema/form-fields'
import { GeneralTab } from './general-tab'
import { PermissionsTab } from './permissions-tab'

export enum AppEditTab {
  general = 'general',
  authentication = 'authentication',
  permissions = 'permissions',
  acIntegration = 'acIntegration',
  appListing = 'appListing',
  pipelines = 'pipelines',
}

export interface AppEditTabsProps {
  tab: AppEditTab
  register: UseFormRegister<AppEditFormSchema>
  errors: DeepMap<Partial<AppEditFormSchema>, FieldError>
  control: Control<AppEditFormSchema, object>
  getValues: UseFormGetValues<AppEditFormSchema>
}

export const AppEditTabs: FC<AppEditTabsProps> = (props) => {
  const { tab } = props

  switch (tab) {
    case AppEditTab.pipelines:
      return <AppPipeline />
    case AppEditTab.authentication:
      return <AuthenticationTab {...props} />
    case AppEditTab.permissions:
      return <PermissionsTab {...props} />
    case AppEditTab.appListing:
      return <AppListingTab {...props} />
    case AppEditTab.acIntegration:
      return <AcIntegrationTab {...props} />
    case AppEditTab.general:
    default:
      return <GeneralTab {...props} />
  }
}
