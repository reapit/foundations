import React, { FC } from 'react'
import { Control, DeepMap, FieldError, UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { Route, Switch } from 'react-router'
import Routes from '../../../constants/routes'
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
    <Switch>
      <Route
        path={Routes.APPS_EDIT_AUTHENTICATION}
        exact
        render={(routerProps) => <AuthenticationTab {...routerProps} {...props} />}
      />
      <Route
        path={Routes.APPS_EDIT_PERMISSIONS}
        exact
        render={(routerProps) => <PermissionsTab {...routerProps} {...props} />}
      />
      <Route
        path={Routes.APPS_EDIT_APP_LISTING}
        exact
        render={(routerProps) => <AppListingTab {...routerProps} {...props} />}
      />
      <Route
        path={Routes.APPS_EDIT_AC_INTEGRATION}
        exact
        render={(routerProps) => <AcIntegrationTab {...routerProps} {...props} />}
      />
      <Route
        path={Routes.APPS_EDIT_GENERAL}
        exact
        render={(routerProps) => <GeneralTab {...routerProps} {...props} />}
      />
    </Switch>
  )
}
