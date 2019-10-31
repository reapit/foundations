import React from 'react'
import { History } from 'history'
import { Button } from '@reapit/elements'
import styles from '@/styles/pages/checklist-detail.scss?mod'

export type UpdateStatusSuccessProps = {
  history: History
}

export const UpdateStatusSuccess: React.FC<UpdateStatusSuccessProps> = ({ history }) => {
  return (
    <>
      <p>Success. The ID Status has been updated</p>
      <div className={styles.footerBtn}>
        <Button type="button" variant="primary" onClick={() => history.replace('/')}>
          Close
        </Button>
      </div>
    </>
  )
}

export default UpdateStatusSuccess
