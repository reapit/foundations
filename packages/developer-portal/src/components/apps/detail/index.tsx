import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  BodyText,
  Button,
  Col,
  elMr4,
  FlexContainer,
  Grid,
  Icon,
  Loader,
  PersistantNotification,
  Subtitle,
  Title,
} from '@reapit/elements'
import { AppUriParams, useAppState } from '../state/use-app-state'
import { useParams } from 'react-router-dom'
import { handleSetAppId } from '../utils/handle-set-app-id'
import CopyToClipboard from 'react-copy-to-clipboard'
import { AppClientSecretModel, AppDetailModel } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { LinkChip, PermissionChip, textOverflow, textOverflowContainer } from './__styles__'
import { ExternalPages, openNewPage } from '../../../utils/navigation'

export interface CopyState {
  externalId: string
  clientSecret: string
  appId: string
}

export const defaultCopyState = {
  externalId: 'Copy',
  clientSecret: 'Copy',
  appId: 'Copy',
}

export const handleCopyCode = (setCopyState: Dispatch<SetStateAction<CopyState>>, key: keyof CopyState) => () => {
  setCopyState({
    ...defaultCopyState,
    [key]: 'Copied',
  })

  setTimeout(() => {
    setCopyState((currentState) => ({
      ...currentState,
      [key]: 'Copy',
    }))
  }, 5000)
}

export const getAppStatus = ({ isListed, pendingRevisions, limitToClientIds }: AppDetailModel) => {
  const isPrivateApp = Boolean(limitToClientIds?.length)

  return isListed && !pendingRevisions && !isPrivateApp
    ? 'Your app is live and public in the AppMarket'
    : isListed && !pendingRevisions && isPrivateApp
    ? 'Your app is live in the AppMarket but private to selected customers'
    : isListed && pendingRevisions && !isPrivateApp
    ? 'Your app is live and public in the AppMarket with a pending revision under review'
    : isListed && pendingRevisions && isPrivateApp
    ? 'Your app is live and private to selected customers with a pending revision under review'
    : 'Your app is not live and in development only'
}

export const getIntegrationType = ({ isDirectApi, authFlow, desktopIntegrationTypeIds }: AppDetailModel) => {
  const isAcIntegrated = Boolean(desktopIntegrationTypeIds?.length)

  return authFlow === 'clientCredentials'
    ? 'Your app is a server-side only integration or data feed'
    : isDirectApi
    ? 'You have a client side authenticated integration that will not render within the AgencyCloud desktop CRM'
    : isAcIntegrated
    ? 'You have a client side authenticated integration that will replace a screen or launch from within the AgencyCloud desktop CRM'
    : 'You have a client side authenticated integration that will render within the AgencyCloud desktop CRM'
}

export const AppDetail: FC = () => {
  const { appsDataState, setAppId } = useAppState()
  const [copyState, setCopyState] = useState<CopyState>(defaultCopyState)
  const { appId } = useParams<AppUriParams>()

  useEffect(handleSetAppId(appId, setAppId), [appId])

  const { appDetail, appDetailLoading } = appsDataState
  const { id, name, externalId, authFlow, redirectUris, signoutUris, scopes } = appDetail ?? {}

  const [appSecret] = useReapitGet<AppClientSecretModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppSecret],
    uriParams: { appId },
    fetchWhenTrue: [appId, authFlow === 'clientCredentials'],
  })

  return appDetailLoading ? (
    <Loader />
  ) : appDetail ? (
    <>
      <Title>{name}</Title>
      <Subtitle>Authenticating Your App</Subtitle>
      {authFlow === 'authorisationCode' && (
        <>
          <BodyText hasGreyText>
            Client-side Apps use our identity provider{' '}
            <a onClick={openNewPage(ExternalPages.reapitConnectDocs)}>Reapit Connect</a> to authenticate against our
            API. Your application will need to re-direct to Reapit Connect where we will handle user login and in turn,
            re-direct back to your app with a code in the URL that you exchange for access and id JWTs, referred to as{' '}
            <a onClick={openNewPage(ExternalPages.authoizationFlowDocs)}>Authorization Code flow.</a> You will need the
            Client Id and Redirect Uris below to configure Reapit Connect.
          </BodyText>
          <BodyText hasGreyText hasSectionMargin>
            To make this process easier, we provide you with an authentication module for client-side apps,{' '}
            <a onClick={openNewPage(ExternalPages.connectSessionDocs)}>Connect Session</a>, which comes bundled with our{' '}
            <a onClick={openNewPage(ExternalPages.craDocs)}>Create React App Template</a> for quick start client-side
            development.
          </BodyText>
        </>
      )}
      {authFlow === 'clientCredentials' && (
        <>
          <BodyText hasGreyText>
            Server-side applications authenticate against our API using the{' '}
            <a onClick={openNewPage(ExternalPages.clientCredentials)}>Client Credentials authentication flow.</a> This
            process involves the exchange of a Client Id and Client Secret for a JWT access token to authenticate
            against all requests.
          </BodyText>
          <BodyText hasGreyText>
            To make this process easier, we provide you with a NodeJS authentication module for server-side apps,{' '}
            <a onClick={openNewPage(ExternalPages.connectSessionDocs)}>Connect Session</a>.
          </BodyText>
          <BodyText hasGreyText hasSectionMargin>
            For website developers, you might find our code examples useful. We offer examples in the following
            languages <LinkChip onClick={openNewPage(ExternalPages.codeExampleNodeWebsite)}>Node JS</LinkChip>
            <LinkChip onClick={openNewPage(ExternalPages.codeExamplePHPWebsite)}>.NET</LinkChip>
            <LinkChip onClick={openNewPage(ExternalPages.codeExampleNetWebsite)}>PHP</LinkChip>
          </BodyText>
        </>
      )}
      <Grid>
        {externalId && (
          <Col>
            <FlexContainer>
              <Icon className={elMr4} icon="lockedInfographic" iconSize="medium" />
              <div>
                <Subtitle hasNoMargin>Authentication Client Id</Subtitle>
                <BodyText hasGreyText>{externalId}</BodyText>
              </div>
            </FlexContainer>
            <CopyToClipboard text={externalId} onCopy={handleCopyCode(setCopyState, 'externalId')}>
              <Button intent="low">{copyState.externalId}</Button>
            </CopyToClipboard>
          </Col>
        )}
        {appSecret?.clientSecret && (
          <Col>
            <FlexContainer>
              <Icon className={elMr4} icon="doorLockInfographic" iconSize="medium" />
              <div className={textOverflowContainer}>
                <Subtitle hasNoMargin>Authentication Client Secret</Subtitle>
                <BodyText className={textOverflow} hasGreyText>
                  {appSecret.clientSecret}
                </BodyText>
              </div>
            </FlexContainer>
            <CopyToClipboard text={appSecret.clientSecret} onCopy={handleCopyCode(setCopyState, 'clientSecret')}>
              <Button intent="low">{copyState.clientSecret}</Button>
            </CopyToClipboard>
          </Col>
        )}
        {id && (
          <Col>
            <FlexContainer>
              <Icon className={elMr4} icon="myAppsInfographic" iconSize="medium" />
              <div>
                <Subtitle hasNoMargin>App Id</Subtitle>
                <BodyText className={textOverflow} hasGreyText>
                  {id}
                </BodyText>
              </div>
            </FlexContainer>
            <CopyToClipboard text={id} onCopy={handleCopyCode(setCopyState, 'appId')}>
              <Button intent="low">{copyState.appId}</Button>
            </CopyToClipboard>
          </Col>
        )}
        {authFlow === 'authorisationCode' && Boolean(redirectUris?.length) && (
          <Col>
            <Subtitle hasNoMargin>Redirect Uri(s)</Subtitle>
            {redirectUris?.map((uri) => (
              <BodyText className={textOverflow} key={uri} hasGreyText hasNoMargin>
                {uri}
              </BodyText>
            ))}
          </Col>
        )}
        {authFlow === 'authorisationCode' && Boolean(signoutUris?.length) && (
          <Col>
            <Subtitle hasNoMargin>Sign Out Uri(s)</Subtitle>
            {signoutUris?.map((uri) => (
              <BodyText className={textOverflow} key={uri} hasGreyText hasNoMargin>
                {uri}
              </BodyText>
            ))}
          </Col>
        )}
        <Col>
          <Col>
            <Subtitle hasNoMargin>Integration Type</Subtitle>
            <BodyText hasGreyText hasNoMargin>
              {getIntegrationType(appDetail)}
            </BodyText>
          </Col>
        </Col>
        <Col>
          <Col>
            <Subtitle hasNoMargin>App Status</Subtitle>
            <BodyText hasGreyText hasNoMargin>
              {getAppStatus(appDetail)}
            </BodyText>
          </Col>
        </Col>
        {Boolean(scopes?.length) && (
          <Col>
            <Subtitle hasNoMargin>Permissions</Subtitle>
            {scopes?.map(({ name, description }) => (
              <PermissionChip key={name}>{description}</PermissionChip>
            ))}
          </Col>
        )}
      </Grid>
    </>
  ) : (
    <PersistantNotification intent="secondary" isExpanded isFullWidth isInline>
      No record of this app found
    </PersistantNotification>
  )
}

export default AppDetail
