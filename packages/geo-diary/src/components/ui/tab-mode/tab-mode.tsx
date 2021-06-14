import React, { ChangeEvent, Dispatch, FC, memo, SetStateAction } from 'react'
import { AppState, useAppState, AppTab } from '../../../core/app-state'
import { ToggleRadio, FlexContainer, elMb2 } from '@reapit/elements/v3'

export type HandleChangeTabModeParams = {
  setAppState: Dispatch<SetStateAction<AppState>>
}

export const handleChangeTabMode = ({ setAppState }: HandleChangeTabModeParams) => (
  event: ChangeEvent<HTMLInputElement>,
) => {
  const tab = (event.currentTarget.value ?? 'LIST') as AppTab
  setAppState((currentState) => {
    return {
      ...currentState,
      tab,
    }
  })
}

export const TabMode: FC = () => {
  const { appState, setAppState } = useAppState()
  const { tab } = appState
  return (
    <div className={elMb2}>
      <FlexContainer isFlexJustifyCenter>
        <ToggleRadio
          name="tab-mode"
          onChange={handleChangeTabMode({ setAppState })}
          options={[
            {
              id: 'diary',
              value: 'LIST',
              text: 'Diary',
              isChecked: tab === 'LIST',
            },
            {
              id: 'map',
              value: 'MAP',
              text: 'Map',
              isChecked: tab === 'MAP',
            },
          ]}
        />
      </FlexContainer>
    </div>
  )
}

export default memo(TabMode)
