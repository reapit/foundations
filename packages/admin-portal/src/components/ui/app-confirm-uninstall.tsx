import * as React from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ModalFooter, ModalBody, ModalHeader } from '@reapit/elements'
import { setAppDetailModalStateBrowse, setAppDetailModalStateSuccess } from '@/actions/app-detail-modal'
import { appInstallationsRequestUninstall, UninstallParams } from '@/actions/app-installations'
import { setAppDetailStale } from '@/actions/app-detail'
import { selectInstallationFormState } from '@/selector/installations'
import { selectAppDetailState } from '@/selector/app-detail'

export type AppConfirmUninstallProps = {
  afterClose?: () => void
}

export const handleUninstallSuccess = (isSuccessed: boolean, dispatch: Dispatch) => () => {
  if (isSuccessed) {
    dispatch(setAppDetailModalStateSuccess())
  }
}

export const generateUninstallParams = ({ id, installationId }) => () => {
  return {
    appId: id,
    installationId,
    terminatedReason: 'User uninstall',
  } as UninstallParams
}

export const onAgreeButtonClick = (uninstallParams: UninstallParams, dispatch: Dispatch) => {
  return () => {
    dispatch(appInstallationsRequestUninstall(uninstallParams))
    dispatch(setAppDetailStale(true))
  }
}

export const onDisagreeButtonClick = (dispatch: Dispatch, afterClose?: () => void) => {
  return () => {
    if (afterClose) afterClose()
    dispatch(setAppDetailModalStateBrowse())
  }
}

export const AppConfirmUninstall: React.FC<AppConfirmUninstallProps> = ({ afterClose }) => {
  const dispatch = useDispatch()
  const installationsFormState = useSelector(selectInstallationFormState)
  const { appDetailData } = useSelector(selectAppDetailState)
  const isLoading = installationsFormState === 'SUBMITTING'
  const isSuccessed = installationsFormState === 'SUCCESS'
  const { id, installationId, name } = appDetailData?.data || {}

  React.useEffect(handleUninstallSuccess(isSuccessed, dispatch), [isSuccessed])

  const uninstallParams = React.useMemo(generateUninstallParams({ id, installationId }), [appDetailData])

  return (
    <>
      <ModalHeader title={`Confirm ${name} uninstall`} afterClose={afterClose} data-test="confirm-content" />
      <ModalBody
        body={
          <>Are you sure you wish to uninstall {name}? This action will uninstall the app for ALL platform users.</>
        }
      />
      <ModalFooter
        footerItems={
          <>
            <Button
              dataTest="agree-btn"
              loading={Boolean(isLoading)}
              className="mx-4"
              fullWidth
              type="button"
              variant="primary"
              onClick={onAgreeButtonClick(uninstallParams, dispatch)}
            >
              Agree
            </Button>
            <Button
              dataTest="disagree-btn"
              disabled={Boolean(isLoading)}
              className="mx-4"
              fullWidth
              type="button"
              variant="danger"
              onClick={onDisagreeButtonClick(dispatch, afterClose)}
            >
              Disagree
            </Button>
          </>
        }
      />
    </>
  )
}

export default AppConfirmUninstall
