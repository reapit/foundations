import React, { FC, useCallback, useEffect } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  Col,
  elMb11,
  FlexContainer,
  FormLayout,
  Grid,
  InputGroup,
  InputWrap,
  Subtitle,
  Title,
  useMediaQuery,
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
import { handleLogout } from '.'
import { trackEventHandler, trackEvent } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'

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

export const SettingsProfile: FC = () => {
  const { connectSession, connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const snacks = useSnack()
  const { isMobile } = useMediaQuery()
  const loginIdentity = connectSession?.loginIdentity ?? ({} as LoginIdentity)
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

  useEffect(trackEventHandler(TrackingEvent.LoadProfile, true), [])

  const logoutUser = useCallback(handleLogout(connectLogoutRedirect), [connectLogoutRedirect])

  const { name, email, orgName, clientId, groups } = loginIdentity

  return (
    <>
      <FlexContainer isFlexJustifyBetween>
        <Title>Profile</Title>
        {isMobile && (
          <ButtonGroup alignment="right">
            <Button onClick={logoutUser} intent="critical" chevronRight>
              Logout
            </Button>
          </ButtonGroup>
        )}
      </FlexContainer>
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
      <Subtitle hasBoldText>Update Your Password</Subtitle>
      <form onSubmit={handleSubmit(handleChangePassword(email, snacks))}>
        <FormLayout hasMargin>
          <InputWrap>
            <InputGroup
              {...register('password')}
              type="password"
              label="Current Password"
              errorMessage={errors?.password?.message}
              icon={errors?.password?.message ? 'asteriskSystem' : null}
              intent="danger"
            />
          </InputWrap>
          <InputWrap>
            <InputGroup
              {...register('newPassword')}
              type="password"
              label="New Password"
              errorMessage={errors?.newPassword?.message}
              icon={errors?.newPassword?.message ? 'asteriskSystem' : null}
              intent="danger"
            />
          </InputWrap>
          <InputWrap>
            <InputGroup
              {...register('confirmPassword')}
              type="password"
              label="Confirm New Password"
              errorMessage={errors?.confirmPassword?.message}
              icon={errors?.confirmPassword?.message ? 'asteriskSystem' : null}
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
  )
}

export default SettingsProfile
