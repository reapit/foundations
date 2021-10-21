import React, { createContext, Dispatch, SetStateAction, useContext, useState, ChangeEvent, useEffect, FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { getUserInfo } from '../services/user'
import {
  BodyText,
  elBorderRadius,
  elWFull,
  InputGroup,
  Label,
  MultiSelectOption,
  Select,
  Subtitle,
} from '@reapit/elements'
import { ControlsContainer } from './__styles__/index'
import { OrganisationGroupMemberModel } from '../types/organisations-schema'

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

export const OrgIdContext = createContext<OrgIdContextProps>({} as OrgIdContextProps)

const { Provider } = OrgIdContext

export const refetchEffectHandler = (orgClientId: string | null, refetch: () => void) => () => {
  if (orgClientId) {
    refetch()
  }
}

export const handleFetchInitialState =
  (setOrgIdState: Dispatch<SetStateAction<OrgIdState>>, orgIdState: OrgIdState, email?: string) => () => {
    const fetchUserInfo = async () => {
      if (email && !orgIdState.orgIdOptions.length) {
        const userInfo = await getUserInfo(email)
        if (userInfo) {
          const orgMembers = userInfo.organisationGroupMembers ?? []
          const orgIdOptions =
            orgMembers.map((member) => ({
              name: member.name ?? '',
              value: member.organisationId ?? '',
            })) ?? []
          const orgId = orgMembers.length === 1 ? orgMembers[0].organisationId ?? null : null
          const orgName = orgMembers.length === 1 ? orgMembers[0].name ?? null : null
          const orgClientId = orgMembers.length === 1 ? orgMembers[0].customerId ?? null : null

          setOrgIdState({ orgId, orgName, orgClientId, orgIdOptions, orgMembers })
        }
      }
    }

    fetchUserInfo()
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

      connectClearSession()
    }
  }

  return {
    orgIdState,
    setOrgIdState: handleSetOrgIdState,
  }
}

export const OrgIdStateProvider: FC = ({ children }) => {
  const [orgIdState, setOrgIdState] = useState<OrgIdState>({
    orgId: null,
    orgName: null,
    orgClientId: null,
    orgIdOptions: [],
    orgMembers: [],
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

export const OrgIdSelect: FC = () => {
  const {
    orgIdState: { orgId, orgIdOptions },
    setOrgIdState,
  } = useOrgId()

  if (orgIdOptions.length < 2) return null

  return (
    <>
      <Subtitle>Organisations</Subtitle>
      <BodyText hasGreyText>
        You are and admin for multiple organisations - select from the list below for data specific to one of these
        organisations
      </BodyText>
      <ControlsContainer className={elBorderRadius}>
        <InputGroup>
          <Select className={elWFull} value={orgId ?? ''} onChange={setOrgIdState}>
            <option key="default-option">Please Select</option>
            {orgIdOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </Select>
          <Label htmlFor="myId">Select Organisation</Label>
        </InputGroup>
      </ControlsContainer>
    </>
  )
}
