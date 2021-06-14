import React, { ChangeEvent, Dispatch, FC, memo, SetStateAction } from 'react'
import { AppState, AppTravelMode, useAppState } from '../../../core/app-state'
import { ToggleRadio, FlexContainer, elMb2 } from '@reapit/elements/v3'

export type HandleChangeTravelModeParams = {
  setAppState: Dispatch<SetStateAction<AppState>>
}

export const handleChangeTravelMode = ({ setAppState }: HandleChangeTravelModeParams) => (
  event: ChangeEvent<HTMLInputElement>,
) => {
  const travelMode = (event.currentTarget.value ?? 'DRIVING') as AppTravelMode
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
    <div className={elMb2}>
      <FlexContainer isFlexJustifyCenter>
        <ToggleRadio
          name="travel-mode"
          onChange={handleChangeTravelMode({ setAppState })}
          options={[
            {
              id: 'driving',
              value: 'DRIVING',
              text: 'Driving',
              isChecked: travelMode === 'DRIVING',
            },
            {
              id: 'walking',
              value: 'WALKING',
              text: 'Walking',
              isChecked: travelMode === 'WALKING',
            },
          ]}
        />
      </FlexContainer>
    </div>
  )
}

export default memo(TravelMode)
