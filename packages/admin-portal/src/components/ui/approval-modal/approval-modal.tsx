import * as React from 'react'
import { useSelector } from 'react-redux'
import { Modal, ModalProps, Loader, Button, ModalHeader, ModalFooter, ModalBody, Alert } from '@reapit/elements'
import ApproveRevisionModal from './approve-revision-modal'
import DeclineRevisionModal from './decline-revision-modal'
import AppRevisionComparison from '../app-revision-comparison/app-revision-comparison'
import { selectAppRevisionDetail } from '@/selector/app-revisions'
import { selectAppDetailState } from '@/selector/app-detail'

export type ApprovalModalInnerProps = {
  closeParentModal?: () => void
  onApprovalClick: () => void
  onDeclineClick: () => void
}
export const ApprovalModalInner: React.FunctionComponent<ApprovalModalInnerProps> = ({
  closeParentModal,
  onApprovalClick,
  onDeclineClick,
}) => {
  const revisionDetailState = useSelector(selectAppRevisionDetail)
  const appDetailState = useSelector(selectAppDetailState)

  if (!revisionDetailState || appDetailState.isLoading) {
    return <ModalBody body={<Loader />} />
  }

  if (revisionDetailState.isLoading || appDetailState.errorMessage) {
    return <ModalBody body={<Alert type="danger" message="Failed to fetch. Please try later." />} />
  }

  if (!revisionDetailState.data || !appDetailState.data) {
    return null
  }

  const app = appDetailState.data

  return (
    <React.Fragment>
      <ModalHeader
        title={`Confirm ${app.name} revision`}
        afterClose={closeParentModal as () => void}
        data-test="revision-detail-modal"
      />
      <ModalBody
        body={<AppRevisionComparison appDetailState={appDetailState} revisionDetailState={revisionDetailState} />}
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

export type ApprovalModalProps = Pick<ModalProps, 'visible' | 'afterClose'>

export const ApprovalModal: React.FunctionComponent<ApprovalModalProps> = ({ visible = true, afterClose }) => {
  const [isApproveModalOpen, setIsApproveModalOpen] = React.useState(false)
  const [isDeclineModalOpen, setIsDeclineModalOpen] = React.useState(false)
  return (
    <React.Fragment>
      <Modal visible={visible} afterClose={afterClose} deps={[]}>
        <ApprovalModalInner
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

export default ApprovalModal
