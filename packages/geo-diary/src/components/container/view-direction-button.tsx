import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setDestination } from '@/actions/direction'
import { setSelectedAppointment } from '@/actions/appointments'
import { Button } from '@reapit/elements'
import { ExtendedAppointmentModel } from '@/types/core'
import { homeTabChange } from '@/actions/home'

export type ViewDirectionButtonProps = {
  handleOnClick: () => void
}

export const ViewDirectionButton = ({ handleOnClick }: ViewDirectionButtonProps) => {
  return (
    <Button className="is-centered mr-2" variant="info" type="button" onClick={handleOnClick}>
      Directions
    </Button>
  )
}

export type ViewDirectionButtonMappedActions = {
  handleOnClick: () => void
}

export type ViewDirectionButtonOwnProps = {
  appointment: ExtendedAppointmentModel
}

export const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: ViewDirectionButtonOwnProps,
): ViewDirectionButtonMappedActions => ({
  handleOnClick: () => {
    const appointment = ownProps.appointment
    dispatch(setSelectedAppointment(appointment))
    dispatch(setDestination(appointment))
    dispatch(homeTabChange('MAP'))
  },
})

const ViewDirectionWithRedux = connect<null, ViewDirectionButtonMappedActions, ViewDirectionButtonOwnProps>(
  null,
  mapDispatchToProps,
)(ViewDirectionButton)

ViewDirectionWithRedux.displayName = 'ViewDirectionWithRedux'

export default ViewDirectionWithRedux
