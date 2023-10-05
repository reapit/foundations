import { BodyText, elBorderRadius, elMb5, elWFull, InputGroup, Label, Select, SmallText } from '@reapit/elements'
import React, { FC } from 'react'
import { useOrgId } from '../../utils/use-org-id'
import { ControlsContainer } from './__styles__/index'

export const OrgIdSelect: FC = () => {
  const {
    orgIdState: { orgId, orgIdOptions },
    setOrgIdState,
  } = useOrgId()

  if (orgIdOptions.length < 2) return null

  return (
    <div className={elMb5}>
      <BodyText>Organisations</BodyText>
      <SmallText hasGreyText>
        You are an admin for multiple organisations - select from the list below for data specific to one of these
        organisations
      </SmallText>
      <ControlsContainer className={elBorderRadius}>
        <InputGroup>
          <Select className={elWFull} value={orgId ?? ''} onChange={setOrgIdState}>
            <option key="default-option" value={''}>
              Please Select
            </option>
            {orgIdOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </Select>
          <Label htmlFor="myId">Select Organisation</Label>
        </InputGroup>
      </ControlsContainer>
    </div>
  )
}
