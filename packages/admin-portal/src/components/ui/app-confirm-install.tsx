import * as React from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { Button, ModalHeader, ModalBody, ModalFooter } from '@reapit/elements'
import { setAppDetailModalStateBrowse, setAppDetailModalStateSuccess } from '@/actions/app-detail-modal'
import { appInstallationsRequestInstall } from '@/actions/app-installations'
import { selectInstallationFormState } from '@/selector/installations'
import { selectAppDetail } from '@/selector/client'

export type AppConfirmInstallContentProps = {
  afterClose?: () => void
}

export const handleCloseModal = (dispatch: Dispatch, afterClose?: () => void) => () => {
  if (afterClose) afterClose()
  dispatch(setAppDetailModalStateBrowse())
}

export const handleInstallSuccess = (isSuccessed: boolean, dispatch: Dispatch) => () => {
  if (isSuccessed) {
    dispatch(setAppDetailModalStateSuccess())
  }
}

export const onConfirmButtonClick = (dispatch: Dispatch, appId?: string) => {
  return () => {
    if (!appId) {
      return
    }
    dispatch(
      appInstallationsRequestInstall({
        appId,
      }),
    )
  }
}

export const AppConfirmInstallContent: React.FC<AppConfirmInstallContentProps> = ({ afterClose }) => {
  const dispatch = useDispatch()
  const installationsFormState = useSelector(selectInstallationFormState)
  const { appDetailData } = useSelector(selectAppDetail)

  const isLoading = installationsFormState === 'SUBMITTING'
  const isSuccessed = installationsFormState === 'SUCCESS'

  const { name, id, scopes = [] } = appDetailData?.data || {}

  React.useEffect(handleInstallSuccess(isSuccessed, dispatch), [isSuccessed])

  return (
    <>
      <ModalHeader
        title={`Confirm ${name} installation`}
        afterClose={afterClose as () => void}
        data-test="confirm-content"
      />
      <ModalBody
        body={
          scopes.length ? (
            <>
              <p>
                This action will install the app for ALL platform users.
                <br />
                {name} requires the permissions below. By installing you are granting permission to your data.
              </p>
              <ul className={appPermissionContentStyles.permissionList}>
                {scopes.map(({ description, name }) => (
                  <li key={name} className={appPermissionContentStyles.permissionListItem}>
                    {description}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>This action will install the app for ALL platform users.</>
          )
        }
      />
      <ModalFooter
        footerItems={
          <>
            <Button
              dataTest="agree-btn"
              loading={Boolean(isLoading)}
              className={appPermissionContentStyles.installButton}
              type="button"
              variant="primary"
              onClick={onConfirmButtonClick(dispatch, id)}
            >
              Confirm
            </Button>
            <Button
              dataTest="disagree-btn"
              disabled={Boolean(isLoading)}
              className={appPermissionContentStyles.installButton}
              type="button"
              variant="danger"
              onClick={handleCloseModal(dispatch, afterClose)}
            >
              Cancel
            </Button>
          </>
        }
      />
    </>
  )
}

export default AppConfirmInstallContent
