import React, { Dispatch, FC, memo, SetStateAction } from 'react'
import { AppState, AppTravelMode, useAppState } from '../../../core/app-state'
import { ToggleTravelCheckbox, ToggleTravelLabel } from './__styles__/index'
import drivingSelected from '../../../assets/driving-sel.svg'
import drivingDeselected from '../../../assets/driving-des.svg'
import walkingSelected from '../../../assets/walking-sel.svg'
import walkingDeselected from '../../../assets/walking-des.svg'

export type HandleChangeTravelModeParams = {
  setAppState: Dispatch<SetStateAction<AppState>>
  travelMode: AppTravelMode
}

export const handleChangeTravelMode = ({ setAppState, travelMode }: HandleChangeTravelModeParams) => () => {
  const newValue = travelMode === 'DRIVING' ? 'WALKING' : 'DRIVING'
  setAppState((currentState) => {
    return {
      ...currentState,
      travelMode: newValue,
    }
  })
}

export const TravelMode: FC = () => {
  const { appState, setAppState } = useAppState()
  const { travelMode } = appState
  return (
    <>
      <ToggleTravelCheckbox
        id="travel-mode"
        type="checkbox"
        checked={travelMode === 'DRIVING'}
        onChange={handleChangeTravelMode({ setAppState, travelMode })}
      />
      <ToggleTravelLabel htmlFor="travel-mode">
        <img src={travelMode === 'DRIVING' ? drivingSelected : drivingDeselected} />
        <img src={travelMode === 'WALKING' ? walkingSelected : walkingDeselected} />
      </ToggleTravelLabel>
    </>
  )
}

export default memo(TravelMode)
