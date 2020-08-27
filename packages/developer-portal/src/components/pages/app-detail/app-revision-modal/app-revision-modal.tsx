import * as React from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchAppDetail,
  fetchAppRevisionDetail,
  clearAppRevisionDetail,
  declineAppRevision,
  fetchAppRevisionList,
  clearAppRevisionList,
} from '@/actions/apps'
import { AppDetailState } from '@/reducers/apps/app-detail'
import { Modal, Loader, Button, ModalV2 } from '@reapit/elements'
import AppRevisionComparison from './app-revision-comparison'
import CallToAction from '@/components/ui/call-to-action'
import { selectAppRevisions, selectAppRevisionDetail, selectDeclineAppRevisionLoading } from '@/selector/app-revisions'
import { selectLoginIdentity } from '@/selector/auth'
import { useReapitConnect, LoginIdentity } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export type AppRevisionModalProps = {
  visible: boolean
  appId: string
  appDetailState: AppDetailState
  afterClose: () => void
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
      declineAppRevision({
        id: appId,
        revisionId: appRevisionId,
        name,
        email,
        rejectionReason: 'Developer Cancelled',
        successCallback: onCancelSuccess,
      }),
    )
  }
}

export const handelePendingRevisionsModalAfterClose = (afterClose: () => void, dispatch: Dispatch) => {
  return () => {
    afterClose()
    dispatch(clearAppRevisionList())
    dispatch(clearAppRevisionDetail())
  }
}

export const backToAppDetailsModal = (appId: string, dispatch: Dispatch) => {
  return () => {
    dispatch(clearAppRevisionList())
    dispatch(clearAppRevisionDetail())
    dispatch(fetchAppDetail({ id: appId }))
  }
}

export const handleUseEffectToFetchAppRevisions = (appId: string, dispatch: Dispatch, visible: boolean) => {
  return () => {
    if (appId && visible) {
      dispatch(fetchAppRevisionList({ id: appId }))
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
      dispatch(
        fetchAppRevisionDetail({
          id: appId,
          revisionId: appRevisionId,
        }),
      )
    }
  }
}

export const onCancelRevisionSuccess = (setIsDeclinedSuccessfully: React.Dispatch<React.SetStateAction<boolean>>) => {
  return () => {
    setIsDeclinedSuccessfully(true)
  }
}

export const DeveloperAppRevisionModal: React.FC<AppRevisionModalProps> = ({
  visible,
  appId,
  appDetailState,
  afterClose,
}) => {
  const [isDeclinedSuccessfully, setIsDeclinedSuccessfully] = React.useState(false)
  const dispatch = useDispatch()
  const revisions = useSelector(selectAppRevisions)
  const revisionDetailState = useSelector(selectAppRevisionDetail)

  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = selectLoginIdentity(connectSession)

  const latestAppRevisionId = revisions[0] && revisions[0].id
  const { isLoading, data } = revisionDetailState

  const isDeclining = useSelector(selectDeclineAppRevisionLoading)

  let hasRevisionDetailData = false
  if (data) {
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
        {!isLoading && hasRevisionDetailData ? (
          <AppRevisionComparison appDetailState={appDetailState} revisionDetailState={revisionDetailState} />
        ) : (
          <Loader />
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
                  onCancelRevisionSuccess(setIsDeclinedSuccessfully),
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
        {/*
         * TODOME(cancelNoti)
         * use modalV2
         */}
        <ModalV2
          hasHeader={false}
          isCentered={true}
          isPadding={false}
          visible={isDeclinedSuccessfully}
          afterClose={backToAppDetailsModal(appId, dispatch)}
        >
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
        </ModalV2>
      </>
    </Modal>
  )
}

export default DeveloperAppRevisionModal
