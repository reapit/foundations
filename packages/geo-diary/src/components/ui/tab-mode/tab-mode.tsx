import React, { Dispatch, FC, memo, SetStateAction } from 'react'
import { AppState, useAppState, AppTab } from '../../../core/app-state'
import { Button } from '@reapit/elements'
import { TabModeButtonContainer } from './__styles__'

export type HandleChangeTabModeParams = {
  setAppState: Dispatch<SetStateAction<AppState>>
  tab: AppTab
}

export const handleChangeTabMode =
  ({ setAppState, tab }: HandleChangeTabModeParams) =>
  () => {
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
  const text = tab === 'LIST' ? 'MAP' : 'DIARY'
  const nextTab = tab === 'LIST' ? 'MAP' : 'LIST'
  return (
    <TabModeButtonContainer>
      <Button intent="primary" onClick={handleChangeTabMode({ setAppState, tab: nextTab })}>
        {text}
      </Button>
    </TabModeButtonContainer>
  )
}

export default memo(TabMode)
