import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@reapit/elements'
import AppHighlightedChanges from './app-highlighted-changes/app-highlighted-changes'
import { RevisionDetailState } from '@/reducers/revision-detail'
import { AppDetailState } from '@/reducers/app-detail'

export type DeveloperAppHighlightedChangesModalProps = {
  visible: boolean
} & DeveloperAppHighlightedChangesModalMappedProps

export interface DeveloperAppHighlightedChangesModalMappedProps {
  revisionDetailState?: RevisionDetailState
  appDetailState?: AppDetailState
}

export const mapStateToProps = (state: ReduxState): DeveloperAppHighlightedChangesModalMappedProps => ({
  revisionDetailState: state.revisionDetail,
  appDetailState: state.appDetail,
})

export const handleCancelPendingRevisionsButtonClick = () => {
  return () => {}
}

export const DeveloperAppHighlightedChangesModal: React.FC<DeveloperAppHighlightedChangesModalProps> = ({
  visible,
  revisionDetailState,
  appDetailState,
}) => {
  const renderModalBody = () => {
    if (!revisionDetailState || !appDetailState) {
      return
    }
    return <AppHighlightedChanges appDetailState={appDetailState} revisionDetailState={revisionDetailState} />
  }

  return (
    <Modal visible={visible}>
      <>
        <ModalHeader title="Pending Revisions" />
        <ModalBody body={renderModalBody()} />
        <ModalFooter
          footerItems={
            <React.Fragment>
              <Button
                variant="primary"
                type="button"
                onClick={handleCancelPendingRevisionsButtonClick()}
                dataTest="revision-approve-button"
              >
                CANCEL PENDING REVISIONS
              </Button>
            </React.Fragment>
          }
        />
      </>
    </Modal>
  )
}

export default connect(mapStateToProps, null)(DeveloperAppHighlightedChangesModal)
