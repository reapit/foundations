import React, { ChangeEvent, Dispatch, memo, SetStateAction } from 'react'
import { AppState, useAppState, AppTimeRange } from '../../../core/app-state'
import { elMb2, FlexContainer, ToggleRadio } from '@reapit/elements/v3'

export type HandleChangeTimeParams = {
  setAppState: Dispatch<SetStateAction<AppState>>
}

export const handleChangeTime = ({ setAppState }: HandleChangeTimeParams) => (event: ChangeEvent<HTMLInputElement>) => {
  const time = (event.currentTarget.value ?? 'TODAY') as AppTimeRange
  setAppState((currentState) => ({
    ...currentState,
    time,
    destinationLat: null,
    destinationLng: null,
    appointmentId: null,
  }))
}

export const AppointmentTime = () => {
  const { appState, setAppState } = useAppState()
  const { time } = appState
  return (
    <div className={elMb2}>
      <FlexContainer isFlexJustifyCenter>
        <ToggleRadio
          name="appointment-time"
          onChange={handleChangeTime({ setAppState })}
          options={[
            {
              id: 'today',
              value: 'TODAY',
              text: 'Today',
              isChecked: time === 'TODAY',
            },
            {
              id: 'tomorrow',
              value: 'TOMORROW',
              text: 'Tomorrow',
              isChecked: time === 'TOMORROW',
            },
            {
              id: 'week',
              value: 'WEEK',
              text: 'Week',
              isChecked: time === 'WEEK',
            },
          ]}
        />
      </FlexContainer>
    </div>
  )
}

export default memo(AppointmentTime)
