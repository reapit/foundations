import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  ChangeEvent,
  useEffect,
  FC,
  PropsWithChildren,
} from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { getUserInfo } from '../services/user'
import { OrganisationGroupMemberModel } from '@reapit/foundations-ts-definitions'
import { MultiSelectOption } from '@reapit/elements'

export interface OrgIdState {
  orgId: string | null
  orgName: string | null
  orgClientId: string | null
  orgIdOptions: MultiSelectOption[]
  orgMembers: OrganisationGroupMemberModel[]
}

export interface OrgIdContextProps {
  orgIdState: OrgIdState
  setOrgIdState: Dispatch<SetStateAction<OrgIdState>>
}

export interface UseOrgIdState {
  orgIdState: OrgIdState
  setOrgIdState: (event: ChangeEvent<HTMLSelectElement>) => void
}

const defaultState: OrgIdState = {
  orgId: null,
  orgName: null,
  orgClientId: null,
  orgIdOptions: [],
  orgMembers: [],
}

export const OrgIdContext = createContext<OrgIdContextProps>({} as OrgIdContextProps)

const { Provider } = OrgIdContext

export const handleFetchInitialState =
  (setOrgIdState: Dispatch<SetStateAction<OrgIdState>>, orgIdState: OrgIdState, email?: string) => () => {
    const fetchUserInfo = async () => {
      if (email && !orgIdState.orgIdOptions.length && !orgIdState.orgClientId) {
        const userInfo = await getUserInfo(email)

        if (!userInfo) return

        const orgMembers = userInfo.organisationGroupMembers ?? []
        const orgIdOptions =
          (orgMembers
            .map(({ name, organisationId }) => ({
              name: name ?? '',
              value: organisationId ?? '',
            }))
            .filter(Boolean) as MultiSelectOption[]) ?? []
        const orgId = !orgMembers.length ? (userInfo.organisationId ?? null) : null
        const orgName = !orgMembers.length ? (userInfo.organisationName ?? null) : null
        const orgClientId = !orgMembers.length ? (userInfo.userCustomerId ?? null) : null

        setOrgIdState({ orgId, orgName, orgClientId, orgIdOptions, orgMembers })
      }
    }

    fetchUserInfo().catch((error) => console.error(error))
  }

export const useOrgId = (): UseOrgIdState => {
  const { orgIdState, setOrgIdState } = useContext(OrgIdContext)
  const { connectClearSession, connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const email = connectSession?.loginIdentity.email

  useEffect(handleFetchInitialState(setOrgIdState, orgIdState, email), [email, orgIdState])

  const handleSetOrgIdState = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const orgId = event.target.value

    if (orgId) {
      setOrgIdState((currentState: OrgIdState) => {
        const { orgMembers } = currentState
        const org = orgMembers.find((member) => member.organisationId === orgId)

        const orgName = org?.name ?? null
        const orgClientId = org?.customerId ?? null

        return {
          ...currentState,
          orgId,
          orgName,
          orgClientId,
        }
      })
      // TODO: needs testing - previously we needed a fresh access token each time but seems to be fine now
      // Can be removed assuming no issues found 28/20/25
      // connectClearSession()
    } else {
      setOrgIdState(defaultState)
    }
  }

  return {
    orgIdState,
    setOrgIdState: handleSetOrgIdState,
  }
}

export const OrgIdStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [orgIdState, setOrgIdState] = useState<OrgIdState>(defaultState)

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
