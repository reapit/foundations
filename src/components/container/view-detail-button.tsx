import React from 'react'
import { connect } from 'react-redux'
import { Button } from '@reapit/elements'
import { appointmentDetailRequestData } from '@/actions/appointment-detail'
import { Dispatch } from 'redux'

export type ViewDetailButtonProps = {
  onClick: () => void
}

export const ViewDetailButton: React.FC<ViewDetailButtonProps> = ({ onClick }) => {
  return (
    <Button variant="primary" type="button" onClick={onClick}>
      Details
    </Button>
  )
}

export type MapDisPatchToPropsType = {
  dispatch: Dispatch
  ownProps: { id: string | undefined }
}

export const handleOnClick = (dispatch, ownProps) => () => {
  if (!ownProps || !ownProps.id) {
    return null
  }
  dispatch(appointmentDetailRequestData({ id: ownProps.id }))
}

export const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: { id: string | undefined }
): ViewDetailButtonProps => ({
  onClick: handleOnClick(dispatch, ownProps)
})

const CurrentLocButtonWithRedux = connect(
  null,
  mapDispatchToProps
)(ViewDetailButton)

CurrentLocButtonWithRedux.displayName = 'CurrentLocButtonWithRedux'

export default CurrentLocButtonWithRedux
