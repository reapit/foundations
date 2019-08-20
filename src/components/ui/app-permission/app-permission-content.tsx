import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { ScopeModel } from '@/types/marketplace-api-schema'
import bulma from '@/styles/vendor/bulma'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { Button } from '@reapit/elements'
import { setAppDetailModalStateView, setAppDetailModalStateViewConfirm } from '@/actions/app-detail-modal'

export interface AppPermissionModalMappedProps {
  permissions: ScopeModel[]
  appName: string
}

export interface AppPermissionModalMappedActions {
  setAppDetailModalStateConfirm: () => void
  setAppDetailModalStateView: () => void
}
export type AppPermissionInnerProps = AppPermissionModalMappedProps &
  AppPermissionModalMappedActions & {
    setAppDetailModalStateView: () => void
    afterClose?: () => void
  }

export const handleCloseModal = (afterClose, setAppDetailModalStateView) => () => {
  afterClose()
  setAppDetailModalStateView()
}
export const AppPermissionContent = ({
  permissions,
  setAppDetailModalStateConfirm,
  appName,
  afterClose,
  setAppDetailModalStateView
}: AppPermissionInnerProps) => {
  return (
    <div>
      <h3 className={`${bulma.title} ${bulma.is3} ${appPermissionContentStyles.heading}`}>Permissions Required</h3>
      <h6 className={appPermissionContentStyles.subtitle}>
        {appName} requires the following permissions to integrate with the platform. By installing you are consenting to
        the the following:
      </h6>
      <ul className={appPermissionContentStyles.permissionList}>
        {permissions.map(({ description }) => (
          <li className={appPermissionContentStyles.permissionListItem}>{description}</li>
        ))}
      </ul>
      <div className={appPermissionContentStyles.installButtonContainer}>
        <Button
          dataTest="btnInstall"
          className={appPermissionContentStyles.installButton}
          type="button"
          variant="primary"
          onClick={setAppDetailModalStateConfirm}
        >
          Install
        </Button>
        <Button
          className={appPermissionContentStyles.installButton}
          type="button"
          variant="danger"
          onClick={handleCloseModal(afterClose, setAppDetailModalStateView)}
        >
          Dismiss
        </Button>
      </div>
    </div>
  )
}

export const mapStateToProps = (state: ReduxState): AppPermissionModalMappedProps => ({
  permissions: state.appPermission.appPermissionData || [],
  appName:
    (state.appDetail &&
      state.appDetail.appDetailData &&
      state.appDetail.appDetailData.data &&
      state.appDetail.appDetailData.data.name) ||
    ''
})

export const mapDispatchToProps = (dispatch: any): AppPermissionModalMappedActions => ({
  setAppDetailModalStateView: () => dispatch(setAppDetailModalStateView()),
  setAppDetailModalStateConfirm: () => dispatch(setAppDetailModalStateViewConfirm())
})

const AppPermissionContentInnerWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPermissionContent)

AppPermissionContentInnerWithConnect.displayName = 'AppPermissionContentInnerWithConnect'

export default AppPermissionContentInnerWithConnect
