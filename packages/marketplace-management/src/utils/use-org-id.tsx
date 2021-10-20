import React, { createContext, Dispatch, SetStateAction, useContext, useState, ChangeEvent, useEffect, FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { getUserInfo } from '../services/user'
import { MultiSelectOption } from '@reapit/elements'

export interface OrgIdState {
  orgId: string | null
  orgIdOptions: MultiSelectOption[]
}

export interface OrgIdContextProps {
  orgIdState: OrgIdState
  setOrgIdState: Dispatch<SetStateAction<OrgIdState>>
}

export interface UseOrgIdState {
  orgIdState: OrgIdState
  setOrgIdState: () => (event: ChangeEvent<HTMLSelectElement>) => void
}

export const OrgIdContext = createContext<OrgIdContextProps>({} as OrgIdContextProps)

const { Provider } = OrgIdContext

export const OrgIdStateProvider: FC = ({ children }) => {
  const [orgIdState, setOrgIdState] = useState<OrgIdState>({
    orgId: null,
    orgIdOptions: [],
  })

  return (
    <Provider
      value={{
        orgIdState: orgIdState,
        setOrgIdState: setOrgIdState,
      }}
    >
      {children}
    </Provider>
  )
}

export const handleFetchInitialState = (setOrgIdState: Dispatch<SetStateAction<OrgIdState>>, email?: string) => () => {
  const fetchUserInfo = async () => {
    if (email) {
      const res = await getUserInfo(email)
      if (res) {
        const orgIdOptions =
          res.organisationGroupMembers?.map((member) => ({
            name: member.name ?? '',
            value: member.organisationGroupId ?? '',
          })) ?? []
        setOrgIdState((currentState) => ({ ...currentState, orgIdOptions }))
      }
    }
  }

  fetchUserInfo()
}

export const useOrgId = (): UseOrgIdState => {
  const { orgIdState, setOrgIdState } = useContext(OrgIdContext)
  const { connectClearSession, connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const email = connectSession?.loginIdentity.email

  useEffect(handleFetchInitialState(setOrgIdState, email), [email])

  const handleSetOrgIdState = () => (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const orgId = event.target.value

    connectClearSession()

    setOrgIdState((currentState: OrgIdState) => ({
      ...currentState,
      orgId,
    }))
  }

  return {
    orgIdState,
    setOrgIdState: handleSetOrgIdState,
  }
}
