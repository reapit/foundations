import React from 'react'
import { History } from 'history'
import { Button } from '@reapit/elements'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { checklistDetailHideModal } from '@/actions/checklist-detail'

export type UpdateStatusSuccessProps = {
  history: History
} & DispatchProps

export const UpdateStatusSuccess: React.FC<UpdateStatusSuccessProps> = ({ history, hideModal }) => {
  const handleClose = () => {
    hideModal()
    history.replace('/')
  }
  return (
    <>
      <p>Success. The ID Status has been updated</p>
      <div className={styles.footerBtn}>
        <Button type="button" variant="primary" onClick={handleClose}>
          Close
        </Button>
      </div>
    </>
  )
}

export interface DispatchProps {
  hideModal: () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  hideModal: () => dispatch(checklistDetailHideModal()),
})

export default connect(null, mapDispatchToProps)(UpdateStatusSuccess)
