import * as React from 'react'
import { Button } from '@reapit/elements'
import mapStyles from '@/styles/pages/map.scss?mod'
import { isIOS } from '@/utils/device-detection'

const { mapPanel } = mapStyles

export interface MapPanelProps {
  duration: string
  distance: string
  destination: { lat: number | undefined; lng: number | undefined }
}

export const MapPanel = ({ duration, distance, destination }: MapPanelProps) => {
  const openDefaultMap = () => {
    if (isIOS()) {
      window.open(`maps://maps.google.com/maps?daddr=${destination.lat},${destination.lng}&amp;ll=`)
    } else {
      window.open(`https://maps.google.com/maps?daddr=${destination.lat},${destination.lng}&amp;ll=`)
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
