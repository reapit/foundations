import * as React from 'react'
import { oc } from 'ts-optchain'
import { connect } from 'react-redux'
import { FormState } from '../../types/core'
import { setDeveloperAppModalStateViewDetail } from '@/actions/developer-app-modal'
import { appDeleteRequest } from '@/actions/app-delete'
import { ReduxState } from '@/types/core'
import Alert from '@/components/ui/alert'
import { Button } from '@reapit/elements'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import appDeleteStyles from '@/styles/pages/app-delete.scss?mod'

export interface AppDeleteMappedProps {
  formState: FormState
  appName: string
}
export interface AppDeleteMappedActions {
  appDeleteRequest: () => void
  setDeveloperAppModalStateViewDetail: () => void
}
export type AppDeleteProps = AppDeleteMappedActions & AppDeleteMappedProps

const AppDelete = ({ appName, formState, setDeveloperAppModalStateViewDetail, appDeleteRequest }: AppDeleteProps) => {
  const isLoading = formState === 'SUBMITTING'
  if (formState === 'SUCCESS') {
    return <Alert dataTest="delete-app-success-message" message={`App ${appName} has been deleted`} type="success" />
  }

  return (
    <div data-test="confirm-content">
      <h6 className={`${appDeleteStyles.subtitle} ${appPermissionContentStyles.subtitle}`}>
        Are you sure you want to remove this App ‘{appName}’. By clicking ‘Confirm’ it will remove the App and all its
        data, including all revisions and listings. Please click ‘Confirm’ to continue with deletion.
      </h6>
      <div className={appPermissionContentStyles.installButtonContainer}>
        <Button
          data-test="agree-btn"
          loading={Boolean(isLoading)}
          className={appPermissionContentStyles.installButton}
          type="button"
          variant="primary"
          onClick={appDeleteRequest}
        >
          Confirm
        </Button>
        <Button
          data-test="disagree-btn"
          loading={Boolean(isLoading)}
          className={appPermissionContentStyles.installButton}
          type="button"
          variant="danger"
          onClick={setDeveloperAppModalStateViewDetail}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state: ReduxState): AppDeleteMappedProps => ({
  formState: state.appDelete.formState,
  appName: oc(state.appDetail.appDetailData).data.name('')
})

const mapDispatchToProps = (dispatch: any): AppDeleteMappedActions => ({
  setDeveloperAppModalStateViewDetail: () => dispatch(setDeveloperAppModalStateViewDetail()),
  appDeleteRequest: () => dispatch(appDeleteRequest())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDelete)
