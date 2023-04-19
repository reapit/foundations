import React, { FC } from 'react'
import { Control, DeepMap, FieldError, UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { Route, Routes } from 'react-router'
import RoutePaths from '../../../constants/routes'
import { AcIntegrationTab } from './ac-integration-tab'
import { AppListingTab } from './app-listing-tab'
import { AuthenticationTab } from './authentication-tab'
import { AppEditFormSchema } from './form-schema/form-fields'
import { GeneralTab } from './general-tab'
import { PermissionsTab } from './permissions-tab'

export enum AppEditTab {
  general = 'general',
  authentication = 'authentication',
  permissions = 'permissions',
  acIntegration = 'ac-integration',
  appListing = 'app-listing',
}

export interface AppEditTabsProps {
  register: UseFormRegister<AppEditFormSchema>
  errors: DeepMap<Partial<AppEditFormSchema>, FieldError>
  control: Control<AppEditFormSchema, object>
  getValues: UseFormGetValues<AppEditFormSchema>
}

export const AppEditTabs: FC<AppEditTabsProps> = (props) => {
  return (
    <Routes>
      <Route path={RoutePaths.APPS_EDIT_AUTHENTICATION.split('edit/')[1]} element={<AuthenticationTab {...props} />} />
      <Route path={RoutePaths.APPS_EDIT_PERMISSIONS.split('edit/')[1]} element={<PermissionsTab {...props} />} />
      <Route path={RoutePaths.APPS_EDIT_APP_LISTING.split('edit/')[1]} element={<AppListingTab {...props} />} />
      <Route path={RoutePaths.APPS_EDIT_AC_INTEGRATION.split('edit/')[1]} element={<AcIntegrationTab {...props} />} />
      <Route path={RoutePaths.APPS_EDIT_GENERAL.split('edit/')[1]} element={<GeneralTab {...props} />} />
    </Routes>
  )
}
