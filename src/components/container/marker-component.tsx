import * as React from 'react'
import { Dispatch } from 'redux'
import { CoordinateProps } from '@reapit/elements'
import { appointmentDetailRequestData } from '@/actions/appointment-detail'
import { connect } from 'react-redux'

export type MarkerComponentProps = {
  handleOnClick: () => void
  coordinate: CoordinateProps<any>
}

export const MarkerComponent = ({ coordinate, handleOnClick }: MarkerComponentProps) => {
  const { address1, address2 } = coordinate
  return (
    <div onClick={handleOnClick}>
      <p>{address1}</p>
      <p>{address2}</p>
    </div>
  )
}

export type ownProps = {
  id: string
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: ownProps) => ({
  handleOnClick: () => dispatch(appointmentDetailRequestData({ id: ownProps.id }))
})

export const MarkerComponentWithConnect = connect(
  null,
  mapDispatchToProps
)(MarkerComponent)
