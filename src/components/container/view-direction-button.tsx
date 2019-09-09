import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setDestination } from '@/actions/direction'
import { Button } from '@reapit/elements'
import { AppointmentModel } from '@/types/appointments'
import { homeTabChange } from '@/actions/home'

export type ViewDirectionButtonProps = {
  handleOnClick: () => void
}

export const ViewDirectionButton = ({ handleOnClick }: ViewDirectionButtonProps) => {
  return (
    <Button variant="primary" type="button" onClick={handleOnClick}>
      View Direction
    </Button>
  )
}

export type ViewDirectionButtonMappedActions = {
  handleOnClick: () => void
}

export type ViewDirectionButtonOwnProps = {
  appointment: AppointmentModel
}

export const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: ViewDirectionButtonOwnProps
): ViewDirectionButtonMappedActions => ({
  handleOnClick: () => {
    dispatch(setDestination(ownProps.appointment))
    dispatch(homeTabChange('MAP'))
  }
})

const ViewDirectionWithRedux = connect<null, ViewDirectionButtonMappedActions, ViewDirectionButtonOwnProps>(
  null,
  mapDispatchToProps
)(ViewDirectionButton)

ViewDirectionWithRedux.displayName = 'ViewDirectionWithRedux'

export default ViewDirectionWithRedux
