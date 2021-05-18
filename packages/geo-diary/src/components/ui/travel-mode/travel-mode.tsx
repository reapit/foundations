import React, { Dispatch, FC, memo, SetStateAction } from 'react'
import { ButtonGroup, Button } from '@reapit/elements'
import { AppState, AppTravelMode, useAppState } from '../../../core/app-state'

export type HandleChangeTravelModeParams = {
  travelMode: AppTravelMode
  setAppState: Dispatch<SetStateAction<AppState>>
}

export const handleChangeTravelMode = ({ setAppState, travelMode }: HandleChangeTravelModeParams) => () => {
  setAppState((currentState) => {
    return {
      ...currentState,
      travelMode,
    }
  })
}

export const TravelMode: FC = () => {
  const { appState, setAppState } = useAppState()
  const { travelMode } = appState
  return (
    <ButtonGroup isCentered className="is-narrow mb-2">
      <Button
        type="button"
        variant={travelMode !== 'WALKING' ? 'primary' : 'secondary'}
        onClick={handleChangeTravelMode({ setAppState, travelMode: 'DRIVING' })}
      >
        Car
      </Button>
      <Button
        type="button"
        variant={travelMode === 'WALKING' ? 'primary' : 'secondary'}
        onClick={handleChangeTravelMode({ setAppState, travelMode: 'WALKING' })}
      >
        Walk
      </Button>
    </ButtonGroup>
  )
}

export default memo(TravelMode)
