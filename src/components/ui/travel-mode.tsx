import * as React from 'react'
import bulma from '@/styles/vendor/bulma'

export type TravelMode = 'DRIVING' | 'WALKING'

export interface TravelModeProps {
  travelMode: TravelMode
  onChangeTravelMode: (mode: string) => void
}

export const TravelMode = ({ travelMode, onChangeTravelMode }: TravelModeProps) => {
  const handleChangeMode = (value: TravelMode) => {
    onChangeTravelMode(value)
  }
  return (
    <div className={`${bulma.isCentered} ${bulma.buttons} ${bulma.hasAddons}`}>
      <span
        className={
          bulma.button + (travelMode === 'DRIVING' ? ` ${bulma.isSelected} ${bulma.isActive} ${bulma.isPrimary}` : '')
        }
        onClick={() => handleChangeMode('DRIVING')}
      >
        Car
      </span>
      <span
        className={
          bulma.button + (travelMode === 'WALKING' ? ` ${bulma.isSelected} ${bulma.isActive} ${bulma.isPrimary}` : '')
        }
        onClick={() => handleChangeMode('WALKING')}
      >
        Walk
      </span>
    </div>
  )
}

export default React.memo(TravelMode)
