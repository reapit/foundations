import * as React from 'react'
import { Dispatch } from 'redux'
import { appointmentDetailRequestData } from '@/actions/appointment-detail'
import { connect } from 'react-redux'
import { MarkerProps } from '@reapit/elements'

interface MarkerPropsExtended {
  address1: string
  address2: string
  id: string
}

export type MarkerPropsExened = MarkerProps<MarkerPropsExtended>
export interface MarkerComponentInnerProps {
  marker: MarkerPropsExened
}

export type MapContainerDispatchProps = {
  markerOnClick: (id: string) => void
}

export type MarkerComponentProps = MarkerComponentInnerProps & MapContainerDispatchProps

export const MarkerComponent = ({ marker, markerOnClick }: MarkerComponentProps) => {
  const { address1, address2, id } = marker
  const onClick = () => {
    markerOnClick(id)
  }

  return (
    <div onClick={onClick}>
      <p>{address1}</p>
      <p>{address2}</p>
    </div>
  )
}

export const mapDispatchToProps: (dispatch: Dispatch) => MapContainerDispatchProps = (dispatch: Dispatch) => ({
  markerOnClick: (id: string) => dispatch(appointmentDetailRequestData({ id }))
})

export const MarkerComponentWithConnect = connect(
  null,
  mapDispatchToProps
)(MarkerComponent)
