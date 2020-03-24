import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { appDetailRequestData } from '@/actions/app-detail'
import {
  revisionDetailRequestData,
  RevisionDetailRequestParams,
  declineRevision,
  RevisionDeclineRequestParams,
  revisionDetailClearData,
} from '@/actions/revision-detail'
import { revisionsRequestData, revisionsClearData } from '@/actions/revisions'
import { AppDetailState } from '@/reducers/app-detail'
import { RevisionsState } from '@/reducers/revisions'
import { RevisionDetailState } from '@/reducers/revision-detail'
import { LoginIdentity } from '@reapit/cognito-auth'

import { Modal, Loader, Button } from '@reapit/elements'
import AppRevisionComparision from '../app-revision-comparision/app-revision-comparision'
import CallToAction from '@/components/ui/call-to-action'

export interface OwnProps {
  visible: boolean
  appId: string
  appDetailState: AppDetailState
  afterClose: () => void
}

export interface DeveloperAppModalMappedProps {
  revisionsState: RevisionsState
  revisionDetailState: RevisionDetailState
  loginIdentity?: LoginIdentity
}

export interface DeveloperAppModalMappedAction {
  fetchAppDetail: (id: string) => void
  fetchAppRevisions: (appId: string) => void
  fetchAppRevisionDetail: (params: RevisionDetailRequestParams) => void
  declineAppRevision: (params: RevisionDeclineRequestParams) => void
  clearAppRevisionDetail: () => void
  clearAppRevisions: () => void
}

export type DeveloperAppRevisionModalProps = OwnProps & DeveloperAppModalMappedProps & DeveloperAppModalMappedAction

export const handleCancelPendingRevisionsButtonClick = (
  declineAppRevision: (params: RevisionDeclineRequestParams) => void,
  appId: string,
  appRevisionId?: string,
  loginIdentity?: LoginIdentity,
) => {
  return () => {
    if (!appRevisionId || !loginIdentity) {
      return
    }
    const { name, email } = loginIdentity
    declineAppRevision({
      appId,
      appRevisionId,
      name,
      email,
      rejectionReason: 'Developer Cancelled',
    })
  }
}

export const handelePendingRevisionsModalAfterClose = (afterClose, clearAppRevisions, clearAppRevisionDetail) => {
  return () => {
    afterClose()
    clearAppRevisions()
    clearAppRevisionDetail()
  }
}

export const backToAppDetailsModal = (fetchAppDetail, clearAppRevisions, clearAppRevisionDetail, appId) => {
  return () => {
    clearAppRevisions()
    clearAppRevisionDetail()
    fetchAppDetail(appId)
  }
}

export const handleUseEffecttoFetchAppRevisions = (appId, fetchAppRevisions, visible) => {
  return () => {
    if (appId && visible) {
      fetchAppRevisions(appId)
    }
  }
}

export const handleUseEffecttoFetchAppRevisionDetail = (appId, appRevisionId, fetchAppRevisionDetail, visible) => {
  return () => {
    if (appId && appRevisionId && visible) {
      fetchAppRevisionDetail({ appId, appRevisionId })
    }
  }
}

export const DeveloperAppRevisionModal: React.FC<DeveloperAppRevisionModalProps> = ({
  visible,
  appId,
  revisionDetailState,
  revisionsState,
  appDetailState,
  loginIdentity,
  fetchAppDetail,
  fetchAppRevisions,
  fetchAppRevisionDetail,
  declineAppRevision,
  clearAppRevisionDetail,
  clearAppRevisions,
  afterClose,
}) => {
  const { revisions } = revisionsState
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

  React.useEffect(handleUseEffecttoFetchAppRevisions(appId, fetchAppRevisions, visible), [
    appId,
    fetchAppRevisions,
    visible,
  ])

  React.useEffect(
    handleUseEffecttoFetchAppRevisionDetail(appId, latestAppRevisionId, fetchAppRevisionDetail, visible),
    [appId, latestAppRevisionId, fetchAppRevisionDetail, visible],
  )

  return (
    <Modal
      visible={visible}
      title="Pending Revisions"
      afterClose={handelePendingRevisionsModalAfterClose(afterClose, clearAppRevisions, clearAppRevisionDetail)}
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
          <AppRevisionComparision appDetailState={appDetailState} revisionDetailState={revisionDetailState} />
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
                  declineAppRevision,
                  appId,
                  latestAppRevisionId,
                  loginIdentity,
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

        <Modal
          visible={isDeclinedSuccessfully}
          afterClose={backToAppDetailsModal(fetchAppDetail, clearAppRevisions, clearAppRevisionDetail, appId)}
        >
          <CallToAction
            title="SUCCESS"
            type="success"
            buttonText="BACK TO APP"
            onButtonClick={backToAppDetailsModal(fetchAppDetail, clearAppRevisions, clearAppRevisionDetail, appId)}
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

const mapStateToProps = (state: ReduxState) => ({
  revisionsState: state.revisions,
  revisionDetailState: state.revisionDetail,
  loginIdentity: state.auth.loginSession?.loginIdentity,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAppDetail: (id: string) => dispatch(appDetailRequestData({ id })),
  fetchAppRevisions: (appId: string) => dispatch(revisionsRequestData({ appId })),
  fetchAppRevisionDetail: param => dispatch(revisionDetailRequestData(param)),
  declineAppRevision: params => dispatch(declineRevision(params)),
  clearAppRevisionDetail: () => dispatch(revisionDetailClearData(null)),
  clearAppRevisions: () => dispatch(revisionsClearData(null)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperAppRevisionModal)
