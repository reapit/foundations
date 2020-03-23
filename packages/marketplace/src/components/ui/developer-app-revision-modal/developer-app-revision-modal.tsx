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

export const handleAppRevisionModalAfterClose = (afterClose, clearAppRevisionDetail, clearAppRevisions) => {
  return () => {
    clearAppRevisions()
    clearAppRevisionDetail()
    afterClose()
  }
}

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

export const backToAppDetailsModal = (fetchAppDetail, appId) => {
  return () => {
    fetchAppDetail(appId)
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
  const appRevisionId = revisionsData && revisionsData[0].id
  const { declineFormState, loading: revisionDetailLoading } = revisionDetailState
  const isLoading = declineFormState === 'SUBMITTING'
  const isDeclinedSuccessfully = declineFormState === 'SUCCESS'

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = React.useState(false)
  const [isSuccessModalVisible, setIsSuccessModalVisible] = React.useState(false)

  React.useEffect(() => {
    if (appId && visible) {
      fetchAppRevisions(appId)
    }
  }, [appId, fetchAppRevisions, visible])

  React.useEffect(() => {
    if (appId && appRevisionId && visible) {
      fetchAppRevisionDetail({ appId, appRevisionId })
    }
  }, [appId, appRevisionId, fetchAppRevisionDetail, visible])

  React.useEffect(() => {
    if (isDeclinedSuccessfully) {
      setIsSuccessModalVisible(true)
      setIsConfirmationModalVisible(false)
    }
  }, [appId, fetchAppDetail, isDeclinedSuccessfully])

  return (
    <Modal
      visible={visible}
      title="Pending Revisions"
      afterClose={handleAppRevisionModalAfterClose(afterClose, clearAppRevisionDetail, clearAppRevisions)}
      footerItems={
        !revisionDetailLoading && (
          <Button
            variant="primary"
            type="button"
            onClick={() => setIsConfirmationModalVisible(true)}
            dataTest="revision-approve-button"
          >
            CANCEL PENDING REVISIONS
          </Button>
        )
      }
    >
      <>
        {revisionDetailLoading ? (
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
                loading={isLoading}
                onClick={handleCancelPendingRevisionsButtonClick(
                  declineAppRevision,
                  appId,
                  appRevisionId,
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

        <Modal visible={isSuccessModalVisible} afterClose={backToAppDetailsModal(fetchAppDetail, appId)}>
          <CallToAction
            title="SUCCESS"
            type="success"
            buttonText="BACK TO APP"
            onButtonClick={backToAppDetailsModal(fetchAppDetail, appId)}
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
