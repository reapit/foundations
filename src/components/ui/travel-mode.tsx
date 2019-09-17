import * as React from 'react'
import bulma from '@/styles/vendor/bulma'

export type TravelMode = 'DRIVING' | 'WALKING'

export interface TravelModeProps {
  travelMode: TravelMode
  onChangeTravelMode: (mode: string) => void
}

export const TravelMode = ({ travelMode, onChangeTravelMode }: TravelModeProps) => (
  <div className={`${bulma.isCentered} ${bulma.buttons} ${bulma.hasAddons}`}>
    <span
      className={
        bulma.button + (travelMode === 'DRIVING' ? ` ${bulma.isSelected} ${bulma.isActive} ${bulma.isPrimary}` : '')
      }
      onClick={() => onChangeTravelMode('DRIVING')}
    >
      Car
    </span>
    <span
      className={
        bulma.button + (travelMode === 'WALKING' ? ` ${bulma.isSelected} ${bulma.isActive} ${bulma.isPrimary}` : '')
      }
      onClick={() => onChangeTravelMode('WALKING')}
    >
      Walk
    </span>
  </div>
)

export default React.memo(TravelMode)
