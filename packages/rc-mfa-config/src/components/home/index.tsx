import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  Title,
  Subtitle,
  Button,
  elHFull,
  elMb5,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNavContainer,
  SmallText,
  Loader,
  PersistentNotification,
  elMb7,
  ButtonGroup,
  elMb11,
  elFadeIn,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { openNewPage } from '../../utils/navigation'
import { SendFunction, UpdateReturnTypeEnum, useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import { AuthenticatorModel } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { QrCodeVerify } from './qr-code-verify'
import { ActiveAuthenticator } from '../active-authenticator'
import { cx } from '@linaria/core'

export interface CreateAuthenticatorReturnType {
  secret: string
  id: string
}

export interface CreateAuthenticatorType {
  type: 'softwareToken' | 'sms'
}

export const handleGetQrCode =
  (requestQrCode: SendFunction<CreateAuthenticatorType, boolean | CreateAuthenticatorReturnType>) => () => {
    requestQrCode({ type: 'softwareToken' })
  }

export const handleSetQrCode =
  (
    setQrCode: Dispatch<SetStateAction<CreateAuthenticatorReturnType | undefined>>,
    qrCode?: CreateAuthenticatorReturnType,
  ) =>
  () => {
    if (qrCode) {
      setQrCode(qrCode)
    }
  }

export const handleRefresh =
  (refreshAuthenticators: () => void, qrCodeResponse?: CreateAuthenticatorReturnType) => () => {
    if (qrCodeResponse) {
      // TODO: Remove timeout when DB cluster for orgs has been updated, neccessary for now owing to latency on
      // read / write replications
      setTimeout(() => {
        refreshAuthenticators()
      }, 1000)
    }
  }

export const HomePage: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [qrCode, setQrCode] = useState<CreateAuthenticatorReturnType>()
  const email = connectSession?.loginIdentity.email
  const userId = email ? window.btoa(email.toLowerCase()).replace(/=/g, '') : null

  const [authenticators, authenticatorsLoading, , refreshAuthenticators] = useReapitGet<AuthenticatorModel[]>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getUserAuthenticators],
    uriParams: { userId },
    fetchWhenTrue: [userId],
  })

  const [qrCodeLoading, qrCodeResponse, requestQrCode] = useReapitUpdate<
    CreateAuthenticatorType,
    CreateAuthenticatorReturnType
  >({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createUserAuthenticator],
    method: 'POST',
    returnType: UpdateReturnTypeEnum.RESPONSE,
    uriParams: {
      userId,
    },
  })

  const activeAuthenticator = authenticators?.find((authenticator) => authenticator.status === 'active')

  useEffect(handleRefresh(refreshAuthenticators, qrCodeResponse), [qrCodeResponse])
  useEffect(handleSetQrCode(setQrCode, qrCodeResponse), [qrCodeResponse])

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Configure</Title>
        <Icon className={elMb5} icon="userAuthInfographic" iconSize="large" />
        <Subtitle>Your MFA Config</Subtitle>
        <SmallText hasGreyText>
          This page allows you to configure and reset your Multi Factor Authentication (MFA) device for use with Reapit
          Connect. For more information on how to do this, please refer to the documentation link below.
        </SmallText>
        <Button className={elMb5} intent="neutral" onClick={openNewPage('')}>
          Docs
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Title>Configure MFA Authenticator</Title>
        {authenticatorsLoading ? (
          <Loader className={elMb11} />
        ) : activeAuthenticator ? (
          <>
            <PersistentNotification className={cx(elMb7, elFadeIn)} isFullWidth isExpanded isInline intent="secondary">
              You have an active authenticator registered for your account. If you want to re-configure, click the
              &lsquo;Reset Authenticator&rsquo; button below.
            </PersistentNotification>
            <ActiveAuthenticator
              activeAuthenticator={activeAuthenticator}
              refreshAuthenticators={refreshAuthenticators}
            />
          </>
        ) : (
          <>
            <PersistentNotification className={cx(elMb7, elFadeIn)} isFullWidth isExpanded isInline intent="secondary">
              No authenticators configured for your user account. Please use the button below to configure one.
            </PersistentNotification>
            <ButtonGroup>
              <Button
                intent="critical"
                onClick={handleGetQrCode(requestQrCode)}
                loading={qrCodeLoading}
                disabled={qrCodeLoading}
              >
                Configure MFA Device
              </Button>
            </ButtonGroup>
            <QrCodeVerify refreshAuthenticators={refreshAuthenticators} qrCode={qrCode} setQrCode={setQrCode} />
          </>
        )}
      </PageContainer>
    </FlexContainer>
  )
}

export default HomePage
