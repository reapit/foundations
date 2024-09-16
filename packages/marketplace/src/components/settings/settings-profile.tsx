import React, { FC, useCallback, useEffect } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  Col,
  elMb11,
  ElToggleItem,
  FormLayout,
  Grid,
  InputWrap,
  Subtitle,
  Title,
  Toggle,
} from '@reapit/elements'
import { LoginIdentity, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { RolesChip } from './__styles__'
import { trackEventHandler, trackEvent } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'
import { UpdateUserModel, UserModel } from '@reapit/foundations-ts-definitions'
import { updateActions, UpdateActionNames } from '@reapit/use-reapit-data'
import { SendFunction, useReapitUpdate } from '@reapit/use-reapit-data'
import { useAppsBrowseState } from '../../core/use-apps-browse-state'
import { openNewPage } from '../../utils/navigation'
import { URLS } from '../../constants/urls'

export const handleUserUpdate =
  (
    updateUser: SendFunction<UpdateUserModel, boolean>,
    currentUserState: UserModel | null,
    refreshCurrentUser: () => void,
  ) =>
  async () => {
    const userUpdate = await updateUser({
      ...currentUserState,
      name: currentUserState?.name ?? '',
      consentToTrack: !currentUserState?.consentToTrack,
    })

    if (userUpdate) refreshCurrentUser()
  }

export const SettingsProfile: FC = () => {
  const { currentUserState, refreshCurrentUser } = useAppsBrowseState()
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = connectSession?.loginIdentity ?? ({} as LoginIdentity)
  const email = connectSession?.loginIdentity.email ?? ''
  const userId = email ? window.btoa(email).replace(/=/g, '') : null

  const appEnv = process.env.appEnv

  const [, , updateUser] = useReapitUpdate<UpdateUserModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.updateUser],
    method: 'PUT',
    uriParams: {
      userId,
    },
  })

  useEffect(trackEventHandler(TrackingEvent.LoadProfile, true), [])

  const userUpdate = useCallback(handleUserUpdate(updateUser, currentUserState, refreshCurrentUser), [
    currentUserState,
    updateUser,
    refreshCurrentUser,
  ])

  const { name, orgName, clientId, groups } = loginIdentity

  return (
    <>
      <Title>Profile</Title>
      <Subtitle hasBoldText>Your Details</Subtitle>
      <Grid className={elMb11}>
        {name && (
          <Col>
            <Subtitle hasNoMargin>Name</Subtitle>
            <BodyText hasGreyText hasNoMargin>
              {name}
            </BodyText>
          </Col>
        )}
        {email && (
          <Col>
            <Subtitle hasNoMargin>Email</Subtitle>
            <BodyText hasGreyText hasNoMargin>
              {email}
            </BodyText>
          </Col>
        )}
        {orgName && (
          <Col>
            <Subtitle hasNoMargin>Company Name</Subtitle>
            <BodyText hasGreyText hasNoMargin>
              {orgName}
            </BodyText>
          </Col>
        )}
        {clientId && (
          <Col>
            <Subtitle hasNoMargin>Customer Code</Subtitle>
            <BodyText hasGreyText hasNoMargin>
              {clientId}
            </BodyText>
          </Col>
        )}
        {groups && (
          <Col>
            <Subtitle hasNoMargin>Roles</Subtitle>
            {groups.map((group) => (
              <RolesChip key={group}>{group}</RolesChip>
            ))}
          </Col>
        )}
      </Grid>
      {!connectIsDesktop && (
        <>
          <Subtitle hasBoldText>Update Your Password</Subtitle>
          <BodyText hasGreyText>Please use the Reapit Connect My Account app to manage your account</BodyText>
          <ButtonGroup className={elMb11}>
            <Button intent="primary" type="submit" onClick={openNewPage(`${URLS[appEnv].reapitConnectMyAccount}`)}>
              Manage Account
            </Button>
          </ButtonGroup>
        </>
      )}
      <Subtitle hasBoldText>Update Tracking Consent</Subtitle>
      <BodyText hasGreyText>
        The AppMarket users mechanisms to track your use of the environment to provide an enhanced user experience and
        provide feedback to enable Reapit to improve the product. You can update your preferences below.
      </BodyText>
      {currentUserState && (
        <FormLayout>
          <InputWrap>
            <Toggle
              onChange={userUpdate}
              defaultChecked={currentUserState?.consentToTrack}
              id="tracking-consent"
              hasGreyBg
            >
              <ElToggleItem>Consent</ElToggleItem>
              <ElToggleItem>Deny</ElToggleItem>
            </Toggle>
          </InputWrap>
        </FormLayout>
      )}
    </>
  )
}

export default SettingsProfile
