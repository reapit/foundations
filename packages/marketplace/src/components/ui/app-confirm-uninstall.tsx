import * as React from 'react'
import { connect } from 'react-redux'
import { FormState, ReduxState } from '@/types/core'
import { Button, SubTitleH6, ModalFooter, ModalBody, ModalHeader } from '@reapit/elements'
import { setAppDetailModalStateBrowse, setAppDetailModalStateSuccess } from '@/actions/app-detail-modal'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { appInstallationsRequestUninstall, UninstallParams } from '@/actions/app-installations'
import { setAppDetailStale } from '@/actions/app-detail'

export interface AppConfirmUninstallInnerProps {
  afterClose?: () => void
}

export interface AppConfirmUninstallMappedProps {
  appDetailData?: AppDetailModel
  installationsFormState: FormState
}

export interface AppConfirmUninstallMappedActions {
  setAppDetailModalStateBrowse: () => void
  setAppDetailModalStateSuccess: () => void
  uninstallApp: (params: UninstallParams) => () => void
  setAppDetailStale: (stale: boolean) => void
}

export type AppConfirmUninstallProps = AppConfirmUninstallInnerProps &
  AppConfirmUninstallMappedProps &
  AppConfirmUninstallMappedActions

export const handleCloseModal = (setAppDetailModalStateBrowse: () => void, afterClose?: () => void) => () => {
  if (afterClose) afterClose()
  setAppDetailModalStateBrowse()
}

export const handleUninstallSuccess = ({ isSuccessed, setAppDetailModalStateSuccess }) => () => {
  if (isSuccessed) {
    setAppDetailModalStateSuccess()
  }
}

export const generateUninstallParams = ({ id, installationId }) => () => {
  return {
    appId: id,
    installationId,
    terminatedReason: 'User uninstall'
  } as UninstallParams
}

export const AppConfirmUninstall = ({
  appDetailData,
  uninstallApp,
  installationsFormState,
  afterClose,
  setAppDetailModalStateBrowse,
  setAppDetailModalStateSuccess,
  setAppDetailStale
}: AppConfirmUninstallProps) => {
  const isLoading = installationsFormState === 'SUBMITTING'
  const isSuccessed = installationsFormState === 'SUCCESS'
  const { id, installationId, name } = appDetailData || {}

  React.useEffect(handleUninstallSuccess({ isSuccessed, setAppDetailModalStateSuccess }), [isSuccessed])

  const uninstallParams = React.useMemo(generateUninstallParams({ id, installationId }), [appDetailData])

  return (
    <>
      <ModalHeader
        title={`Confirm ${name} uninstall`}
        afterClose={afterClose as () => void}
        data-test="confirm-content"
      />
      <ModalBody
        body={
          <SubTitleH6 isCentered>
            Are you sure you wish to uninstall {name}? This action will uninstall the app for ALL platform users.
          </SubTitleH6>
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
              onClick={() => {
                uninstallApp(uninstallParams)
                setAppDetailStale(true)
              }}
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
              onClick={handleCloseModal(setAppDetailModalStateBrowse, afterClose)}
            >
              Disagree
            </Button>
          </>
        }
      />
    </>
  )
}

export const mapStateToProps = (state: ReduxState): AppConfirmUninstallMappedProps => ({
  appDetailData: state.appDetail.appDetailData?.data,
  installationsFormState: state.installations.formState
})

export const mapDispatchToProps = (dispatch: any): AppConfirmUninstallMappedActions => ({
  setAppDetailModalStateBrowse: () => dispatch(setAppDetailModalStateBrowse()),
  setAppDetailModalStateSuccess: () => dispatch(setAppDetailModalStateSuccess()),
  uninstallApp: (params: UninstallParams) => dispatch(appInstallationsRequestUninstall(params)),
  setAppDetailStale: (stale: boolean) => dispatch(setAppDetailStale(stale))
})

const AppConfirmUninstallInnerWithConnect = connect(mapStateToProps, mapDispatchToProps)(AppConfirmUninstall)

AppConfirmUninstallInnerWithConnect.displayName = 'AppConfirmUninstallInnerWithConnect'

export default AppConfirmUninstallInnerWithConnect
