import React, { Dispatch, memo, SetStateAction } from 'react'
import { ButtonGroup, Button } from '@reapit/elements'
import { AppState, useAppState, AppTimeRange } from '../../../core/app-state'

export type HandleChangeTimeParams = {
  time: AppTimeRange
  setAppState: Dispatch<SetStateAction<AppState>>
}

export const handleChangeTime = ({ time, setAppState }: HandleChangeTimeParams) => () => {
  setAppState((currentState) => ({
    ...currentState,
    time: time,
    destinationLat: null,
    destinationLng: null,
    appointmentId: null,
  }))
}

export const AppointmentTime = () => {
  const { appState, setAppState } = useAppState()
  const { time } = appState
  return (
    <ButtonGroup className="is-narrow mb-2" isCentered>
      <Button
        type="button"
        variant={time !== 'TOMORROW' && time !== 'WEEK' ? 'primary' : 'secondary'}
        onClick={handleChangeTime({ setAppState, time: 'TODAY' })}
      >
        TODAY
      </Button>
      <Button
        type="button"
        variant={time === 'TOMORROW' ? 'primary' : 'secondary'}
        onClick={handleChangeTime({ setAppState, time: 'TOMORROW' })}
      >
        TOMORROW
      </Button>
      <Button
        type="button"
        variant={time === 'WEEK' ? 'primary' : 'secondary'}
        onClick={handleChangeTime({ setAppState, time: 'WEEK' })}
      >
        WEEK
      </Button>
    </ButtonGroup>
  )
}

export default memo(AppointmentTime)
