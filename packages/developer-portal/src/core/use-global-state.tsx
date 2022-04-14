import { DeveloperModel, MemberModel, MemberModelPagedResult } from '@reapit/foundations-ts-definitions'
import React, { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from './connect-session'

export interface GlobalDataState {
  currentMember: MemberModel | null
  currentDeveloper: DeveloperModel | null
}

export interface GlobalRefreshState {
  members: [boolean, Dispatch<SetStateAction<boolean>>]
}

export interface GlobalStateHook {
  globalDataState: GlobalDataState
  globalRefreshState: GlobalRefreshState
  globalRefreshCurrentMember: () => void
  globalRefreshCurrentDeveloper: () => void
}

export const GlobalStateContext = createContext<GlobalStateHook>({} as GlobalStateHook)

const { Provider } = GlobalStateContext

export const GlobalProvider: FC = ({ children }) => {
  const membersRefresh = useState<boolean>(false)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId
  const email = connectSession?.loginIdentity.email

  const [members, , , refreshMembers] = useReapitGet<MemberModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDeveloperMembers],
    queryParams: { email: encodeURIComponent(email ?? ''), pageSize: 1 },
    uriParams: { developerId },
    fetchWhenTrue: [email, developerId],
  })

  const [currentDeveloper, , , refreshCurrentDeveloper] = useReapitGet<DeveloperModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDeveloper],
    uriParams: { developerId },
    fetchWhenTrue: [developerId],
  })

  const globalDataState: GlobalDataState = {
    currentMember: members?.data && members.data[0] ? members.data[0] : null,
    currentDeveloper,
  }

  const globalRefreshState: GlobalRefreshState = {
    members: membersRefresh,
  }

  return (
    <Provider
      value={{
        globalRefreshCurrentMember: refreshMembers,
        globalRefreshCurrentDeveloper: refreshCurrentDeveloper,
        globalDataState,
        globalRefreshState,
      }}
    >
      {children}
    </Provider>
  )
}

export const useGlobalState = (): GlobalStateHook => {
  return useContext(GlobalStateContext)
}
