import React, { Dispatch, FC, memo, SetStateAction } from 'react'
import { Tabs } from '@reapit/elements'
import { listAndMapTabContainer } from './__styles__'
import { AppState, useAppState, AppTab } from '../../../core/app-state'

export type HandleChangeTabParams = {
  tab: AppTab
  setAppState: Dispatch<SetStateAction<AppState>>
}

export const handleChangeTab = ({ tab, setAppState }: HandleChangeTabParams) => () => {
  setAppState((currentState) => ({
    ...currentState,
    tab,
    destinationLat: null,
    destinationLng: null,
    appointmentId: null,
  }))
}

export const ListAndMapTab: FC = () => {
  const { appState, setAppState } = useAppState()
  const { tab } = appState
  return (
    <Tabs
      className={listAndMapTabContainer}
      tabConfigs={[
        {
          tabIdentifier: 'LIST',
          displayText: 'LIST',
          onTabClick: handleChangeTab({ tab: 'LIST', setAppState }),
          active: tab === 'LIST',
        },
        {
          tabIdentifier: 'MAP',
          displayText: 'MAP',
          onTabClick: handleChangeTab({ tab: 'MAP', setAppState }),
          active: tab === 'MAP',
        },
      ]}
    />
  )
}

export default memo(ListAndMapTab)
