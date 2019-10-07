import * as React from 'react'
import { Button } from '@reapit/elements'
import { oc } from 'ts-optchain'
import mapStyles from '@/styles/pages/map.scss?mod'
import { isIOS } from '@/utils/device-detection'
import { isMobile } from '../../utils/device-detection'
import { ReduxState } from '@/types/core'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setDestination } from '@/actions/direction'
import invalidValues from '@/constants/invalid-values'

const { UNDEFINED_LATLNG_NUMBER } = invalidValues

export type Latlng = {
  lat?: number | undefined
  lng?: number | undefined
}

const { mapPanel, isDesktop } = mapStyles

export interface MapPanelProps {
  duration: string
  distance: string
  currentLocation: { lat?: number; lng?: number }
  destination: { lat?: number; lng?: number }
  filterType: string
  showAllAppointment: () => void
  isDesktopMode: boolean
}

/**
 * Use Dependency Injection approch.
 * instead of mocking.
 */

export const getMapUrl = ({ currentLocation, destination, isIOS = true }: { currentLocation: Latlng; destination: Latlng, isIOS?: boolean }) => {
  let mapUrl = ''
  if (isIOS) {
    mapUrl += 'maps'
  } else {
    mapUrl += 'https'
  }

  mapUrl += '://maps.google.com/maps?'

  if (
    oc(currentLocation.lat)(UNDEFINED_LATLNG_NUMBER) !== UNDEFINED_LATLNG_NUMBER &&
    oc(currentLocation.lng)(UNDEFINED_LATLNG_NUMBER) !== UNDEFINED_LATLNG_NUMBER
  ) {
    mapUrl += `saddr=${currentLocation.lat},${currentLocation.lng}&`
  }

  if (
    oc(destination.lat)(UNDEFINED_LATLNG_NUMBER) !== UNDEFINED_LATLNG_NUMBER &&
    oc(destination.lng)(UNDEFINED_LATLNG_NUMBER) !== UNDEFINED_LATLNG_NUMBER
  ) {
    mapUrl += `daddr=${destination.lat},${destination.lng}`
  }

  return mapUrl
}

export const MapPanel = ({
  duration,
  distance,
  currentLocation,
  destination,
  filterType,
  showAllAppointment,
  isDesktopMode
}: MapPanelProps) => {
  const openDefaultMap = () => {
    window.open(getMapUrl({ currentLocation, destination, isIOS: isIOS() }))
  }

  if (!destination.lat || !destination.lng) {
    return null
  }

  return (
    <div className={`${mapPanel} ${isDesktopMode ? isDesktop : ''}`}>
      <div>
        <p className="is-size-4">{duration}</p>
        <p>{distance}</p>
      </div>
      <div>
        <Button className="is-medium" type="button" variant="primary" onClick={openDefaultMap}>
          Start Journey
        </Button>
      </div>
      {!isMobile() ? (
        <div>
          <Button className="is-medium" type="button" variant="primary" onClick={showAllAppointment}>
            {filterType}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export const mapStateToProps = (state: ReduxState) => {
  return {
    isDesktopMode: oc(state).auth.refreshSession.mode() === 'DESKTOP',
    filterType: oc(state).appointments.time('Today')
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    showAllAppointment: () => {
      dispatch(setDestination(null))
    }
  }
}

const MapPanelWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPanel)
MapPanelWithRedux.displayName = 'MapPanelWithRedux'

export default MapPanelWithRedux
