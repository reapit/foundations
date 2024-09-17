import React, { Dispatch, FC, SetStateAction } from 'react'
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
  BodyText,
} from '@reapit/elements'
import { openNewPage } from '../../utils/navigation'
import { SendFunction } from '@reapit/use-reapit-data'
import { URLS } from '../../constants/urls'

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
      refreshAuthenticators()
    }
  }

export const HomePage: FC = () => {
  const appEnv = process.env.appEnv

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Icon className={elMb5} icon="userAuthInfographic" iconSize="large" />
        <Subtitle>Your MFA Config</Subtitle>
        <SmallText hasGreyText>
          This page allows you to configure and reset your Multi Factor Authentication (MFA) device for use with Reapit
          Connect. For more information on how to do this, please refer to the documentation link below.
        </SmallText>
        <Button
          className={elMb5}
          intent="neutral"
          onClick={openNewPage(
            window.location?.hostname?.includes('.au.')
              ? 'https://help.agentboxcrm.com.au/reapit-connect'
              : 'https://reapit-1.gitbook.io/reapit-connect-mfa/',
          )}
        >
          Docs
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Title>Configure MFA Authenticator</Title>
        <BodyText>
          To setup or reconfigure your MFA device, please click &lsquo;Configure MFA&rsquo; below. You will be
          redirected to your account profile page within Reapit Connect.
        </BodyText>
        <Button intent="primary" onClick={openNewPage(`${URLS[appEnv].reapitConnectMyAccount}`)}>
          Configure MFA
        </Button>
      </PageContainer>
    </FlexContainer>
  )
}

export default HomePage
