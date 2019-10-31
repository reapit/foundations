import * as React from 'react'
import { ButtonGroup, Button } from '@reapit/elements'

export type TravelMode = 'DRIVING' | 'WALKING'

export interface TravelModeProps {
  travelMode: TravelMode
  onChangeTravelMode: (mode: string) => void
}

export const TravelMode = ({ travelMode, onChangeTravelMode }: TravelModeProps) => (
  <ButtonGroup>
    <Button
      type="button"
      variant="secondary"
      className={travelMode === 'DRIVING' ? 'is-selected is-info' : ''}
      onClick={() => onChangeTravelMode('DRIVING')}
    >
      Car
    </Button>
    <Button
      type="button"
      variant="secondary"
      className={travelMode === 'WALKING' ? 'is-selected is-info' : ''}
      onClick={() => onChangeTravelMode('WALKING')}
    >
      Walk
    </Button>
  </ButtonGroup>
)

export default React.memo(TravelMode)
