import { Marketplace } from '@reapit/foundations-ts-definitions'
import React, { FC, createContext, useContext, useState, Dispatch, SetStateAction, PropsWithChildren } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { logger } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from './connect-session'
import { useSnack } from '@reapit/elements'
import Routes from '../constants/routes'
import { NavigateFunction, useNavigate } from 'react-router'

export const PERMISSION_ERROR =
  'The identity attached to this request does not have the required group membership interact with this endpoint'

export interface GlobalDataState {
  currentMember: Marketplace.MemberModel | null
  currentDeveloper: Marketplace.DeveloperModel | null
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

export const handlePermissionError =
  (snack: (message: string) => void, navigate: NavigateFunction) => (error: string) => {
    if (error.includes(PERMISSION_ERROR)) {
      return navigate(Routes.CUSTOMER_REGISTER)
    }

    logger(new Error(error))
    snack(error)
  }

export const GlobalStateContext = createContext<GlobalStateHook>({} as GlobalStateHook)

const { Provider } = GlobalStateContext

export const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  const membersRefresh = useState<boolean>(false)
  const navigate = useNavigate()
  const { error } = useSnack()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId
  const email = connectSession?.loginIdentity.email

  const [members, , , refreshMembers] = useReapitGet<Marketplace.MemberModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getDeveloperMembers],
    queryParams: { email: encodeURIComponent(email ?? ''), pageSize: 1 },
    uriParams: { developerId },
    fetchWhenTrue: [email, developerId],
    onError: handlePermissionError(error, navigate),
  })

  const [currentDeveloper, , , refreshCurrentDeveloper] = useReapitGet<Marketplace.DeveloperModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getDeveloper],
    uriParams: { developerId },
    fetchWhenTrue: [developerId],
    onError: handlePermissionError(error, navigate),
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
