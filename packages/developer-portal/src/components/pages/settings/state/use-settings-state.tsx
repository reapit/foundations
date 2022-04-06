import { MemberModel, MemberModelPagedResult } from '@reapit/foundations-ts-definitions'
import React, { FC, createContext, useContext } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'

export interface SettingsDataState {
  currentMember: MemberModel | null
}

export interface SettingsStateHook {
  settingsDataState: SettingsDataState
}

export const SettingsStateContext = createContext<SettingsStateHook>({} as SettingsStateHook)

const { Provider } = SettingsStateContext

export const SettingsProvider: FC = ({ children }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId
  const email = connectSession?.loginIdentity.email

  const [members] = useReapitGet<MemberModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDeveloperMembers],
    queryParams: { email, pageSize: 1 },
    uriParams: { developerId },
    fetchWhenTrue: [email],
  })

  const settingsDataState: SettingsDataState = {
    currentMember: members?.data && members.data[0] ? members.data[0] : null,
  }

  return (
    <Provider
      value={{
        settingsDataState,
      }}
    >
      {children}
    </Provider>
  )
}

export const useSettingsState = (): SettingsStateHook => {
  return useContext(SettingsStateContext)
}
