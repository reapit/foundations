import * as React from 'react'
import { connect } from 'react-redux'
import { FormState, ReduxState } from '@/types/core'
import { ScopeModel } from '@/types/marketplace-api-schema'
import bulma from '@/styles/vendor/bulma'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import Button from '@/components/form/button'
import { appInstallRequestData } from '@/actions/app-install'
import Alert from '@/components/ui/alert'

export interface AppPermissionModalMappedProps {
  permissions: ScopeModel[]
  appInstallFormState: FormState
}

export interface AppPermissionModalMappedActions {
  requestInstall: () => void
}
export type AppPermissionInnerProps = AppPermissionModalMappedProps & AppPermissionModalMappedActions & {}

export const AppPermissionContent = ({ permissions, requestInstall, appInstallFormState }: AppPermissionInnerProps) => {
  const isLoading = appInstallFormState === 'SUBMITTING'
  const isSuccessed = appInstallFormState === 'SUCCESS'

  if (isSuccessed) {
    return <Alert className="mt-5" message="App installed successfully" type="success" />
  }

  return (
    <div>
      <h3 className={`${bulma.title} ${bulma.is3} ${appPermissionContentStyles.heading}`}>Permission Require</h3>
      {permissions.map(({ name, description }) => (
        <div className={appPermissionContentStyles.permissionBlock}>
          <b>name: {name}</b>
          <p>description: {description}</p>
        </div>
      ))}
      <Button
        loading={Boolean(isLoading)}
        className={appPermissionContentStyles.installButton}
        type="button"
        variant="primary"
        onClick={requestInstall}
      >
        Install
      </Button>
    </div>
  )
}

const mapStateToProps = (state: ReduxState): AppPermissionModalMappedProps => ({
  permissions: state.appPermission.appPermissionData || [],
  appInstallFormState: state.appInstall.formState
})

const mapDispatchToProps = (dispatch: any): AppPermissionModalMappedActions => ({
  requestInstall: () => dispatch(appInstallRequestData())
})

const AppPermissionContentInnerWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPermissionContent)

export default AppPermissionContentInnerWithConnect
