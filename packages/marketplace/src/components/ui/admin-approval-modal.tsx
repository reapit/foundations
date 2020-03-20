import * as React from 'react'
import { Modal, ModalProps, Loader, Button, ModalHeader, ModalFooter, ModalBody, Alert } from '@reapit/elements'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AppDetailState } from '@/reducers/app-detail'
import { RevisionDetailState } from '@/reducers/revision-detail'
import ApproveRevisionModal from './approve-revision-modal'
import DeclineRevisionModal from './decline-revision-modal'
import { compose } from 'redux'
import AppHighlightedChanges from './app-highlighted-changes/app-highlighted-changes'

export type AdminApprovalModalInnerProps = StateProps
export const AdminApprovalModalInner: React.FunctionComponent<AdminApprovalModalInnerProps> = ({
  revisionDetailState,
  appDetailState,
  closeParentModal,
  onApprovalClick,
  onDeclineClick,
}) => {
  if (revisionDetailState.loading || appDetailState.loading) {
    return <ModalBody body={<Loader />} />
  }

  if (revisionDetailState.error || appDetailState.error) {
    return <ModalBody body={<Alert type="danger" message="Failed to fetch. Please try later." />} />
  }

  if (!revisionDetailState.revisionDetailData || !appDetailState.appDetailData) {
    return null
  }

  const app = appDetailState.appDetailData.data

  return (
    <React.Fragment>
      <ModalHeader
        title={`Confirm ${app.name} revision`}
        afterClose={closeParentModal as () => void}
        data-test="revision-detail-modal"
      />
      <ModalBody
        body={<AppHighlightedChanges appDetailState={appDetailState} revisionDetailState={revisionDetailState} />}
      />

      <ModalFooter
        footerItems={
          <React.Fragment>
            <Button
              className="mr-2"
              variant="primary"
              type="button"
              onClick={onApprovalClick}
              dataTest="revision-approve-button"
            >
              Approve
            </Button>
            <Button variant="danger" type="button" onClick={onDeclineClick} data-test="revision-decline-button">
              Decline
            </Button>
          </React.Fragment>
        }
      />
    </React.Fragment>
  )
}

export type StateProps = {
  revisionDetailState: RevisionDetailState
  appDetailState: AppDetailState
  closeParentModal?: () => void
  onApprovalClick: () => void
  onDeclineClick: () => void
}

export const mapStateToProps = (state: ReduxState, ownProps: AdminApprovalInnerWithConnectProps): StateProps => ({
  revisionDetailState: state.revisionDetail,
  appDetailState: state.appDetail,
  closeParentModal: ownProps.closeParentModal,
  onApprovalClick: ownProps.onApprovalClick,
  onDeclineClick: ownProps.onDeclineClick,
})

export const withRedux = connect(mapStateToProps, null)

export type AdminApprovalInnerWithConnectProps = {
  onApprovalClick: () => void
  onDeclineClick: () => void
  closeParentModal?: () => void
}

const AdminApprovalInnerWithConnect = compose<React.FC<AdminApprovalInnerWithConnectProps>>(withRedux)(
  AdminApprovalModalInner,
)

export const handleOnApproveSuccess = (setIsApproveModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setIsApproveModalOpen(false)
}

export const handleOnDeclineSuccess = (setIsDeclineModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setIsDeclineModalOpen(false)
}

export type HandleSetIsApproveModalParams = {
  setIsApproveModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isApproveModalOpen: boolean
  afterClose?: () => void
}

export const handleSetIsApproveModal = ({
  setIsApproveModalOpen,
  isApproveModalOpen,
  afterClose,
}: HandleSetIsApproveModalParams) => () => {
  afterClose && afterClose()
  setIsApproveModalOpen(isApproveModalOpen)
}

export type HandleSetIsDeclineModalParams = {
  setIsDeclineModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isDeclineModalOpen: boolean
  afterClose?: () => void
}

export const handleSetIsDeclineModal = ({
  setIsDeclineModalOpen,
  isDeclineModalOpen,
  afterClose,
}: HandleSetIsDeclineModalParams) => () => {
  afterClose && afterClose()
  setIsDeclineModalOpen(isDeclineModalOpen)
}

export type AdminApprovalModalProps = Pick<ModalProps, 'visible' | 'afterClose'>

export const AdminApprovalModal: React.FunctionComponent<AdminApprovalModalProps> = ({
  visible = true,
  afterClose,
}) => {
  const [isApproveModalOpen, setIsApproveModalOpen] = React.useState(false)
  const [isDeclineModalOpen, setIsDeclineModalOpen] = React.useState(false)
  return (
    <React.Fragment>
      <Modal visible={visible} afterClose={afterClose} deps={[]}>
        <AdminApprovalInnerWithConnect
          onApprovalClick={handleSetIsApproveModal({ setIsApproveModalOpen, isApproveModalOpen: true, afterClose })}
          onDeclineClick={handleSetIsDeclineModal({ setIsDeclineModalOpen, isDeclineModalOpen: true, afterClose })}
          closeParentModal={afterClose}
        />
      </Modal>
      <ApproveRevisionModal
        visible={isApproveModalOpen}
        afterClose={handleSetIsApproveModal({
          setIsApproveModalOpen,
          isApproveModalOpen: false,
        })}
        onApproveSuccess={handleOnApproveSuccess(setIsApproveModalOpen)}
      />
      <DeclineRevisionModal
        visible={isDeclineModalOpen}
        afterClose={handleSetIsDeclineModal({ setIsDeclineModalOpen, isDeclineModalOpen: false })}
        onDeclineSuccess={handleOnDeclineSuccess(setIsDeclineModalOpen)}
      />
    </React.Fragment>
  )
}

export default AdminApprovalModal
