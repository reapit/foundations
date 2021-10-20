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
  setOrgIdState: (event: ChangeEvent<HTMLSelectElement>) => void
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

export const handleFetchInitialState =
  (setOrgIdState: Dispatch<SetStateAction<OrgIdState>>, orgIdState: OrgIdState, email?: string) => () => {
    const fetchUserInfo = async () => {
      if (email && !orgIdState.orgIdOptions.length) {
        const res = await getUserInfo(email)
        if (res) {
          const orgIdOptions =
            res.organisationGroupMembers?.map((member) => ({
              name: member.name ?? '',
              value: member.organisationId ?? '',
            })) ?? []
          const orgId =
            res.organisationGroupMembers && res.organisationGroupMembers?.length === 1
              ? res.organisationGroupMembers[0].organisationId ?? null
              : null
          setOrgIdState({ orgId, orgIdOptions })
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
      setOrgIdState((currentState: OrgIdState) => ({
        ...currentState,
        orgId,
      }))

      connectClearSession()
    }
  }

  return {
    orgIdState,
    setOrgIdState: handleSetOrgIdState,
  }
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
