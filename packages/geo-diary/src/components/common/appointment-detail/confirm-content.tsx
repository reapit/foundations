import React from 'react'
import { Button, H5, FlexContainerResponsive } from '@reapit/elements'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ReduxState } from '@/types/core'
import { showHideConfirmModal, cancelAppointment } from '@/actions/appointment-detail'

export type ConfirmContentProps = StateProps & DispatchProps

export const ConfirmContent: React.FC<ConfirmContentProps> = ({ handleCancel, handleConfirm, isSubmitting }) => {
  return (
    <React.Fragment>
      <H5>Are you sure you want to cancel this appointment?</H5>
      <FlexContainerResponsive>
        <Button loading={isSubmitting} onClick={handleConfirm} type="button" variant="primary">
          Yes
        </Button>
        <Button disabled={isSubmitting} onClick={handleCancel} type="button" variant="primary">
          No
        </Button>
      </FlexContainerResponsive>
    </React.Fragment>
  )
}

export type StateProps = {
  isSubmitting: boolean
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    isSubmitting: state?.appointmentDetail?.confirmModal?.isSubmitting || false,
  }
}

export type DispatchProps = {
  handleCancel: () => void
  handleConfirm: () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    handleCancel: () => dispatch(showHideConfirmModal(false)),
    handleConfirm: () => dispatch(cancelAppointment()),
  }
}
const ConfirmContentWithRedux = connect(mapStateToProps, mapDispatchToProps)(ConfirmContent)
ConfirmContentWithRedux.displayName = 'ConfirmContentWithRedux'
export default ConfirmContentWithRedux
