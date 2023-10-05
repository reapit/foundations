import * as React from 'react'
import { ReapitConnectHook, useReapitConnect } from '@reapit/connect-session'
import { URLS } from '../../../constants/urls'
import { BodyText, FlexContainer, Icon, MainContainer, SmallText, Subtitle, elMb7, elMr5 } from '@reapit/elements'
import { LoginContainer, LoginContentWrapper, LoginRoleTile } from './__styles__'
import { reapitConnectBrowserSession } from '../../../core/connect-session'

type WelcomeProps = {}

export const showHandleAgencyCloudSectionGroups = ['ReapitUser', 'ReapitUsersAdmin']

export const handleIsShowAgencyCloudSectionMemo = (session: ReapitConnectHook) => () => {
  const sessionGroups = session?.connectSession?.loginIdentity?.groups || []

  return sessionGroups.some((group) => showHandleAgencyCloudSectionGroups.includes(group))
}

export const Welcome: React.FC<WelcomeProps> = () => {
  const session = useReapitConnect(reapitConnectBrowserSession)
  const appEnv = process.env.appEnv

  const isShowAgencyCloudSection = React.useMemo(handleIsShowAgencyCloudSectionMemo(session), [
    session?.connectSession?.loginIdentity?.groups,
  ])
  const isDeveloper = (session?.connectSession?.loginIdentity?.groups || []).includes('FoundationsDeveloper')

  return (
    <MainContainer>
      <LoginContainer>
        <LoginContentWrapper>
          <Icon className={elMb7} height="40px" width="200px" icon="reapitLogoInfographic" />
          <Subtitle hasNoMargin hasCenteredText>
            Welcome to Reapit Connect
          </Subtitle>
          <BodyText hasCenteredText>Your account has been successfully created</BodyText>
          <BodyText hasCenteredText>
            Reapit Connect is our single sign on solution which allows you to seamlessly access products and services
            provided by Reapit Ltd.
          </BodyText>
          {isShowAgencyCloudSection && (
            <LoginRoleTile>
              <FlexContainer>
                <Icon className={elMr5} fontSize="4rem" icon="agencyCloudInfographic" />
                <FlexContainer isFlexJustifyCenter isFlexColumn>
                  <BodyText>Agency Cloud</BodyText>
                  <SmallText hasGreyText hasNoMargin>
                    If you have Agency Cloud already installed on your machine, you can now login via Reapit Connect
                    with your new credentials. If not, please contact your IT Department or Administrator to arrange
                    installation.
                  </SmallText>
                </FlexContainer>
              </FlexContainer>
            </LoginRoleTile>
          )}
          {isDeveloper && (
            <LoginRoleTile>
              <a href={URLS[appEnv].developerPortal} target="_blank" rel="noopener noreferrer">
                <FlexContainer>
                  <Icon className={elMr5} fontSize="4rem" icon="developerAppsInfographic" />
                  <FlexContainer isFlexJustifyCenter isFlexColumn>
                    <BodyText>Developer Portal</BodyText>
                    <SmallText hasGreyText hasNoMargin>
                      The Foundations Developer Portal provides a fully scalable, high-performance platform that
                      developers can quickly onboard in minutes to build powerful new apps that can be published
                      directly to the Reapit App Marketplace to extend Agency Cloud and Property Cloud functionality.
                    </SmallText>
                  </FlexContainer>
                </FlexContainer>
              </a>
            </LoginRoleTile>
          )}
          {(isDeveloper || isShowAgencyCloudSection) && (
            <LoginRoleTile>
              <a href={URLS[appEnv].marketplacePortal} target="_blank" rel="noopener noreferrer">
                <FlexContainer>
                  <Icon className={elMr5} fontSize="4rem" icon="appMarketInfographic" />
                  <FlexContainer isFlexJustifyCenter isFlexColumn>
                    <BodyText>AppMarket</BodyText>
                    <SmallText hasGreyText hasNoMargin>
                      The Reapit AppMarket provides agencies with a variety of app and software integrations that have
                      been tested and approved for immediate integration, allowing agencies to customise their Reapit
                      CRM software to suit their business needs
                    </SmallText>
                  </FlexContainer>
                </FlexContainer>
              </a>
            </LoginRoleTile>
          )}
        </LoginContentWrapper>
      </LoginContainer>
    </MainContainer>
  )
}

export default Welcome
