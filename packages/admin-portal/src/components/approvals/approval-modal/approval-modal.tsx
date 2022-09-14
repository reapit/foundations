import * as React from 'react'
import { useSelector } from 'react-redux'
import { Modal, ModalProps, Button, ModalHeader, ModalFooter, ModalBody, Alert } from '@reapit/elements'
import ApproveRevisionModal from './approve-revision-modal'
import DeclineRevisionModal from './decline-revision-modal'
import AppRevisionComparison from '../app-revision-comparison/app-revision-comparison'
import { selectAppRevisionDetail } from '@/selector/app-revisions'
import { selectAppDetailState } from '@/selector/app-detail'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { CreateAppRevisionConsentsModel } from '@reapit/foundations-ts-definitions'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { useReapitConnect } from '@reapit/connect-session'
import { Loader } from '@reapit/elements'

export type ApprovalModalInnerProps = {
  closeParentModal?: () => void
  onApprovalClick: () => void
  onDeclineClick: () => void
}

export const handleSendConstents =
  (
    createConsentEmails: SendFunction<CreateAppRevisionConsentsModel, boolean>,
    closeModal: () => void,
    email?: string,
  ) =>
  async () => {
    createConsentEmails({ actionedBy: email })
    closeModal()
  }

export const ApprovalModalInner: React.FunctionComponent<ApprovalModalInnerProps> = ({
  closeParentModal,
  onApprovalClick,
  onDeclineClick,
}) => {
  const revisionDetailState = useSelector(selectAppRevisionDetail)
  const appDetailState = useSelector(selectAppDetailState)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const appId = appDetailState.data?.id
  const revisionId = revisionDetailState.data?.data?.id
  const email = connectSession?.loginIdentity.email

  const [, , createConsentEmails] = useReapitUpdate<CreateAppRevisionConsentsModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createConsentEmails],
    method: 'POST',
    uriParams: {
      appId,
      revisionId,
    },
  })

  if (!revisionDetailState || appDetailState.isLoading) {
    return <ModalBody body={<Loader />} />
  }

  if (appDetailState.errorMessage) {
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
              onClick={handleSendConstents(createConsentEmails, closeParentModal as () => void, email)}
            >
              Send Consents Email
            </Button>
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

export const handleSetIsApproveModal =
  ({ setIsApproveModalOpen, isApproveModalOpen, afterClose }: HandleSetIsApproveModalParams) =>
  () => {
    afterClose && afterClose()
    setIsApproveModalOpen(isApproveModalOpen)
  }

export type HandleSetIsDeclineModalParams = {
  setIsDeclineModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isDeclineModalOpen: boolean
  afterClose?: () => void
}

export const handleSetIsDeclineModal =
  ({ setIsDeclineModalOpen, isDeclineModalOpen, afterClose }: HandleSetIsDeclineModalParams) =>
  () => {
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
