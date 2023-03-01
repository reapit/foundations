import React, { ChangeEvent, Dispatch, memo, SetStateAction } from 'react'
import { AppState, useAppState, AppTimeRange } from '../../../core/app-state'
import { elMxAuto, ToggleRadio } from '@reapit/elements'
import { cx } from '@linaria/core'
import { AppointmentTimeContainer, appointmentTimeContainerExpanded } from './__styles__/index'

export type HandleChangeTimeParams = {
  setAppState: Dispatch<SetStateAction<AppState>>
}

export const handleChangeTime =
  ({ setAppState }: HandleChangeTimeParams) =>
  (event: ChangeEvent<HTMLInputElement>) => {
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
  const { time, tab } = appState
  const isExpanded = tab === 'LIST'
  return (
    <AppointmentTimeContainer className={cx(isExpanded && appointmentTimeContainerExpanded)}>
      <ToggleRadio
        className={elMxAuto}
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
    </AppointmentTimeContainer>
  )
}

export default memo(AppointmentTime)
