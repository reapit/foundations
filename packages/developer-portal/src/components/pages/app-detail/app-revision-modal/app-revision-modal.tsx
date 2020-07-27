import * as React from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { appDetailRequestData } from '@/actions/app-detail'
import { revisionDetailRequestData, declineRevision, revisionDetailClearData } from '@/actions/revision-detail'
import { revisionsRequestData, revisionsClearData } from '@/actions/revisions'
import { AppDetailState } from '@/reducers/app-detail'

import { Modal, Loader, Button } from '@reapit/elements'
import AppRevisionComparison from './app-revision-comparison'
import CallToAction from '@/components/ui/call-to-action'
import { DeveloperAppDetailState } from '@/reducers/developer'
import { selectAppRevisions, selectAppRevisionDetail } from '@/selector/app-revisions'
import { selectLoginIdentity } from '@/selector/auth'
import { useReapitConnect, LoginIdentity } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export interface OwnProps {
  visible: boolean
  appId: string
  appDetailState: DeveloperAppDetailState | AppDetailState
  afterClose: () => void
  onCancelSuccess?: () => void
}

export type DeveloperAppRevisionModalProps = {
  visible: boolean
  appId: string
  appDetailState: DeveloperAppDetailState | AppDetailState
  afterClose: () => void
  onCancelSuccess?: () => void
}

export const handleCancelPendingRevisionsButtonClick = (
  dispatch: Dispatch,
  appId: string,
  appRevisionId?: string,
  loginIdentity?: LoginIdentity,
  onCancelSuccess?: () => void,
) => {
  return () => {
    if (!appRevisionId || !loginIdentity) {
      return
    }
    const { name, email } = loginIdentity
    dispatch(
      declineRevision({
        appId,
        appRevisionId,
        name,
        email,
        rejectionReason: 'Developer Cancelled',
        callback: onCancelSuccess,
      }),
    )
  }
}

export const handelePendingRevisionsModalAfterClose = (afterClose: () => void, dispatch: Dispatch) => {
  return () => {
    afterClose()
    dispatch(revisionsClearData(null))
    dispatch(revisionDetailClearData(null))
  }
}

export const backToAppDetailsModal = (appId: string, dispatch: Dispatch) => {
  return () => {
    dispatch(revisionsClearData(null))
    dispatch(revisionDetailClearData(null))
    dispatch(appDetailRequestData({ id: appId }))
  }
}

export const handleUseEffectToFetchAppRevisions = (appId: string, dispatch: Dispatch, visible: boolean) => {
  return () => {
    if (appId && visible) {
      dispatch(revisionsRequestData({ appId }))
    }
  }
}

export const handleUseEffectToFetchAppRevisionDetail = (
  appId: string,
  dispatch: Dispatch,
  visible: boolean,
  appRevisionId?: string,
) => {
  return () => {
    if (appId && appRevisionId && visible) {
      dispatch(revisionDetailRequestData({ appId, appRevisionId }))
    }
  }
}

export const DeveloperAppRevisionModal: React.FC<DeveloperAppRevisionModalProps> = ({
  visible,
  appId,
  appDetailState,
  afterClose,
  onCancelSuccess,
}) => {
  const dispatch = useDispatch()
  const revisions = useSelector(selectAppRevisions)
  const revisionDetailState = useSelector(selectAppRevisionDetail)

  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = selectLoginIdentity(connectSession)

  const revisionsData = revisions?.data
  const latestAppRevisionId = revisionsData && revisionsData[0].id
  const { declineFormState, revisionDetailData } = revisionDetailState

  const isDeclining = declineFormState === 'SUBMITTING'
  const isDeclinedSuccessfully = declineFormState === 'SUCCESS'
  let hasRevisionDetailData = false
  if (revisionDetailData) {
    hasRevisionDetailData = true
  }

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = React.useState(false)

  React.useEffect(handleUseEffectToFetchAppRevisions(appId, dispatch, visible), [appId, dispatch, visible])

  React.useEffect(handleUseEffectToFetchAppRevisionDetail(appId, dispatch, visible, latestAppRevisionId), [
    appId,
    latestAppRevisionId,
    dispatch,
    visible,
  ])

  return (
    <Modal
      visible={visible}
      title="Pending Revisions"
      afterClose={handelePendingRevisionsModalAfterClose(afterClose, dispatch)}
      footerItems={
        <Button
          disabled={!hasRevisionDetailData}
          variant="primary"
          type="button"
          onClick={() => setIsConfirmationModalVisible(true)}
          dataTest="revision-approve-button"
        >
          CANCEL PENDING REVISIONS
        </Button>
      }
    >
      <>
        {!hasRevisionDetailData ? (
          <Loader />
        ) : (
          <AppRevisionComparison appDetailState={appDetailState} revisionDetailState={revisionDetailState} />
        )}
        <Modal
          visible={isConfirmationModalVisible}
          title="Please confirm"
          afterClose={() => setIsConfirmationModalVisible(false)}
          footerItems={
            <>
              <Button
                variant="danger"
                type="button"
                loading={isDeclining}
                onClick={handleCancelPendingRevisionsButtonClick(
                  dispatch,
                  appId,
                  latestAppRevisionId,
                  loginIdentity,
                  onCancelSuccess,
                )}
              >
                YES, PROCEED
              </Button>
              <Button variant="primary" type="button" onClick={() => setIsConfirmationModalVisible(false)}>
                CANCEL
              </Button>
            </>
          }
        >
          <p>Are you sure you wish to cancel any pending revisions for this App?</p>
        </Modal>

        <Modal visible={isDeclinedSuccessfully} afterClose={backToAppDetailsModal(appId, dispatch)}>
          <CallToAction
            title="SUCCESS"
            type="success"
            buttonText="BACK TO APP"
            onButtonClick={backToAppDetailsModal(appId, dispatch)}
            isCenter
          >
            All pending revisions for this app have been cancelled. You can now use the ‘Edit Detail’ option to make any
            additional changes as required.
          </CallToAction>
        </Modal>
      </>
    </Modal>
  )
}

export default DeveloperAppRevisionModal
