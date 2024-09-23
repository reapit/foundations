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
  InputGroup,
  InputWrap,
  Loader,
  Subtitle,
  Title,
  Toggle,
  UseSnack,
  useSnack,
} from '@reapit/elements'
import { LoginIdentity, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchemaChangePassword } from './validation-schema'
import { changePasswordService } from '../../services/cognito-identity'
import { RolesChip } from './__styles__'
import { trackEventHandler, trackEvent } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'
import { UpdateUserModel, UserModel } from '@reapit/foundations-ts-definitions'
import { updateActions, UpdateActionNames } from '@reapit/use-reapit-data'
import { SendFunction, useReapitUpdate } from '@reapit/use-reapit-data'
import { useAppsBrowseState } from '../../core/use-apps-browse-state'
import { openNewPage } from '../../utils/navigation'
import { getTokenIssuer, tokenFromCognito } from '../../utils/token'

export type ChangePasswordFormValues = {
  password: string
  newPassword: string
  confirmPassword: string
}

export const handleChangePassword =
  (email: string, { success, error }: UseSnack) =>
  async ({ newPassword, password }: ChangePasswordFormValues) => {
    const passwordChanged = await changePasswordService({
      password,
      newPassword,
      userName: email,
    })

    if (passwordChanged) {
      trackEvent(TrackingEvent.ChangePassword, true)
      success('Successfully updated your password')
    } else {
      error('Failed to update your password. This error has been logged, please try again')
    }
  }

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
  const snacks = useSnack()
  const loginIdentity = connectSession?.loginIdentity ?? ({} as LoginIdentity)
  const token = connectSession?.accessToken ?? ''
  const email = connectSession?.loginIdentity.email ?? ''
  const userId = email ? window.btoa(email).replace(/=/g, '') : null

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: yupResolver(validationSchemaChangePassword),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

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

  if (!token) return <Loader/>
  
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

      {!connectIsDesktop && tokenFromCognito(token) ? (
        <>
          <Subtitle hasBoldText>Update Your Password</Subtitle>
          <BodyText hasGreyText>Please use the Reapit Connect My Account app to manage your account</BodyText>
          <ButtonGroup className={elMb11}>
            <Button intent="primary" type="submit" onClick={openNewPage(`${getTokenIssuer(token)}my-account`)}>
              Manage Account
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <>
          <Subtitle hasBoldText>Update Your Password</Subtitle>
          <form className={elMb11} onSubmit={handleSubmit(handleChangePassword(email, snacks))}>
            <FormLayout hasMargin>
              <InputWrap>
                <InputGroup
                  {...register('password')}
                  type="password"
                  label="Current Password"
                  placeholder="Current Password"
                  errorMessage={errors?.password?.message}
                  icon={errors?.password?.message ? 'asterisk' : null}
                  intent="danger"
                />
              </InputWrap>
              <InputWrap>
                <InputGroup
                  {...register('newPassword')}
                  type="password"
                  label="New Password"
                  placeholder="New Password"
                  errorMessage={errors?.newPassword?.message}
                  icon={errors?.newPassword?.message ? 'asterisk' : null}
                  intent="danger"
                />
              </InputWrap>
              <InputWrap>
                <InputGroup
                  {...register('confirmPassword')}
                  type="password"
                  label="Confirm New Password"
                  placeholder="Confirm New Password"
                  errorMessage={errors?.confirmPassword?.message}
                  icon={errors?.confirmPassword?.message ? 'asterisk' : null}
                  intent="danger"
                />
              </InputWrap>
            </FormLayout>
            <ButtonGroup>
              <Button intent="primary" type="submit">
                Save Changes
              </Button>
            </ButtonGroup>
          </form>
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
