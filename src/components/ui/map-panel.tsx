import * as React from 'react'
import { Button } from '@reapit/elements'
import mapStyles from '@/styles/pages/map.scss?mod'
import { isIOS } from '@/utils/device-detection'

const { mapPanel } = mapStyles

export interface MapPanelProps {
  duration: string
  distance: string
  currentLocation: { lat?: number; lng?: number }
  destination: { lat?: number; lng?: number }
}

export const MapPanel = ({ duration, distance, currentLocation, destination }: MapPanelProps) => {
  const openDefaultMap = () => {
    if (isIOS()) {
      window.open(
        `maps://maps.google.com/maps?saddr=${currentLocation.lat},${currentLocation.lng}&daddr=${destination.lat},${destination.lng}`
      )
    } else {
      window.open(
        `https://maps.google.com/maps?saddr=${currentLocation.lat},${currentLocation.lng}&daddr=${destination.lat},${destination.lng}`
      )
    }
  }

  if (!destination.lat || !destination.lng) {
    return null
  }

  return (
    <div className={mapPanel}>
      <div>
        <p className="is-size-4">{duration}</p>
        <p>{distance}</p>
      </div>
      <Button className="is-large" type="button" variant="primary" onClick={openDefaultMap}>
        Start Journey
      </Button>
    </div>
  )
}

export default MapPanel
