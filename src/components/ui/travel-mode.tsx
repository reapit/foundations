import * as React from 'react'
import { Button } from '@reapit/elements'
import mapStyles from '@/styles/pages/map.scss?mod'

const { mapTravelMode } = mapStyles

export interface TravelModeProps {
  travelMode: 'DRIVING' | 'WALKING'
  onChangeTravelMode: (mode: string) => void
}

export const TravelMode = ({ travelMode, onChangeTravelMode }: TravelModeProps) => {
  const handleChangeMode = e => {
    onChangeTravelMode(e.target.value)
  }
  return (
    <div className={mapTravelMode}>
      <div className="control">
        <label className={`button is-white ${travelMode === 'DRIVING' ? 'is-primary' : ''}`}>
          <input
            className="is-hidden"
            type="radio"
            value="DRIVING"
            checked={travelMode === 'DRIVING'}
            onChange={handleChangeMode}
          />
          Car
        </label>
        <label className={`button is-white ${travelMode === 'WALKING' ? 'is-primary' : ''}`}>
          <input
            className="is-hidden"
            type="radio"
            value="WALKING"
            checked={travelMode === 'WALKING'}
            onChange={handleChangeMode}
          />
          Walk
        </label>
      </div>
    </div>
  )
}

export default React.memo(TravelMode)
