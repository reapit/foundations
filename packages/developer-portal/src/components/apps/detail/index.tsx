import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  BodyText,
  Button,
  CardWrap,
  Col,
  elHFull,
  elMb11,
  elMb7,
  elMr4,
  FlexContainer,
  Grid,
  Icon,
  Loader,
  PersistentNotification,
  Subtitle,
  Title,
} from '@reapit/elements'
import { useAppState } from '../state/use-app-state'
import { useParams } from 'react-router-dom'
import { handleSetAppId } from '../utils/handle-set-app-id'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { SendFunction, UpdateActionNames, updateActions, useReapitGet, useReapitUpdate } from '@reapit/use-reapit-data'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { LinkChip, PermissionChip, textOverflow, textOverflowContainer } from './__styles__'
import { ExternalPages, openNewPage } from '../../../utils/navigation'
import { selectIsDeveloperAdmin } from '../../../utils/auth'
import { useReapitConnect } from '@reapit/connect-session'
import { cx } from '@linaria/core'

export interface CopyState {
  externalId: string
  rotatingExternalId: string
  clientSecret: string
  rotatingClientSecret: string
  appId: string
}

export const defaultCopyState = {
  externalId: 'Copy',
  rotatingExternalId: 'Copy',
  clientSecret: 'Copy',
  rotatingClientSecret: 'Copy',
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

export const getAppStatus = ({ isListed, pendingRevisions, limitToClientIds }: Marketplace.AppDetailModel) => {
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

export const getIntegrationType = ({
  isDirectApi,
  authFlow,
  desktopIntegrationTypeIds,
}: Marketplace.AppDetailModel) => {
  const isAcIntegrated = Boolean(desktopIntegrationTypeIds?.length)

  return authFlow === 'clientCredentials'
    ? 'Your app is a server-side only integration or data feed'
    : isDirectApi
      ? 'You have a client side authenticated integration that will not render within the Reapit CRM'
      : isAcIntegrated
        ? 'You have a client side authenticated integration that will replace a screen or launch from within the Reapit CRM'
        : 'You have a client side authenticated integration that will render within the Reapit CRM'
}

export const handleSetShouldFetchSecret = (setShouldFetchSecret: Dispatch<SetStateAction<boolean>>) => () => {
  setShouldFetchSecret(true)
}

export const handleAuthClient =
  (
    authClientAction: SendFunction<void, boolean>,
    appsDetailRefresh: () => void,
    appSecret: Marketplace.AppClientSecretModel | null,
    refreshAppSecret: () => void,
  ) =>
  async () => {
    const authClientRes = await authClientAction()

    if (authClientRes) {
      appsDetailRefresh()
    }

    if (appSecret) {
      refreshAppSecret()
    }
  }

export const AppDetail: FC = () => {
  const { appsDataState, setAppId } = useAppState()
  const [copyState, setCopyState] = useState<CopyState>(defaultCopyState)
  const [shouldFetchSecret, setShouldFetchSecret] = useState<boolean>(false)
  const { appId } = useParams<'appId'>()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const isAdmin = selectIsDeveloperAdmin(connectSession)

  useEffect(handleSetAppId(setAppId, appId), [appId])

  const { appDetail, appDetailLoading, appsDetailRefresh } = appsDataState
  const { id, name, externalId, authFlow, redirectUris, signoutUris, scopes, rotatingExternalId } = appDetail ?? {}

  const [appSecret, appSecretLoading, , refreshAppSecret] = useReapitGet<Marketplace.AppClientSecretModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getAppSecret],
    uriParams: { appId },
    fetchWhenTrue: [appId, authFlow === 'clientCredentials', shouldFetchSecret],
  })

  const [creatingAuthClient, , createAuthClient] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.createAuthClient],
    method: 'POST',
    uriParams: {
      appId,
    },
  })

  const [deleteingAuthClient, , deleteAuthClient] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteAuthClient],
    method: 'DELETE',
    uriParams: {
      appId,
    },
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
          </BodyText>
        </>
      )}
      {authFlow === 'clientCredentials' && (
        <CardWrap className={elMb11}>
          <Grid className={cx(rotatingExternalId && elMb7)}>
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
                  <Button intent="default">{copyState.externalId}</Button>
                </CopyToClipboard>
              </Col>
            )}
            <Col>
              <FlexContainer>
                <Icon className={elMr4} icon="doorLockInfographic" iconSize="medium" />
                <div className={textOverflowContainer}>
                  <Subtitle hasNoMargin>Authentication Client Secret</Subtitle>
                  <BodyText className={textOverflow} hasGreyText>
                    {appSecret?.clientSecret && isAdmin
                      ? '*********************************'
                      : !isAdmin
                        ? 'You need to be an admin to view this secret'
                        : 'Click to load client secret'}
                  </BodyText>
                </div>
              </FlexContainer>
              {appSecret?.clientSecret ? (
                <CopyToClipboard text={appSecret?.clientSecret} onCopy={handleCopyCode(setCopyState, 'clientSecret')}>
                  <Button intent="default">{copyState.clientSecret}</Button>
                </CopyToClipboard>
              ) : (
                <Button
                  onClick={handleSetShouldFetchSecret(setShouldFetchSecret)}
                  intent="default"
                  disabled={appSecretLoading || !isAdmin}
                  loading={appDetailLoading}
                >
                  Load Secret
                </Button>
              )}
            </Col>
            <Col>
              <FlexContainer className={elHFull} isFlexAlignCenter>
                <Button
                  onClick={handleAuthClient(createAuthClient, appsDetailRefresh, appSecret, refreshAppSecret)}
                  intent="primary"
                  disabled={creatingAuthClient || deleteingAuthClient || !isAdmin || Boolean(rotatingExternalId)}
                  loading={creatingAuthClient}
                >
                  Rotate Authentication
                </Button>
              </FlexContainer>
            </Col>
          </Grid>
          {rotatingExternalId && (
            <>
              <Subtitle>New Authentication Credentials</Subtitle>
              <Grid>
                <Col>
                  <FlexContainer>
                    <Icon className={elMr4} icon="lockedInfographic" iconSize="medium" />
                    <div>
                      <Subtitle hasNoMargin>Authentication Client Id</Subtitle>
                      <BodyText hasGreyText>{rotatingExternalId}</BodyText>
                    </div>
                  </FlexContainer>
                  <CopyToClipboard
                    text={rotatingExternalId}
                    onCopy={handleCopyCode(setCopyState, 'rotatingExternalId')}
                  >
                    <Button intent="default">{copyState.rotatingExternalId}</Button>
                  </CopyToClipboard>
                </Col>
                <Col>
                  <FlexContainer>
                    <Icon className={elMr4} icon="doorLockInfographic" iconSize="medium" />
                    <div className={textOverflowContainer}>
                      <Subtitle hasNoMargin>Authentication Client Secret</Subtitle>
                      <BodyText className={textOverflow} hasGreyText>
                        {appSecret?.rotatingClientSecret && isAdmin
                          ? '*********************************'
                          : !isAdmin
                            ? 'You need to be an admin to view this secret'
                            : 'Click to load client secret'}
                      </BodyText>
                    </div>
                  </FlexContainer>
                  {appSecret?.rotatingClientSecret ? (
                    <CopyToClipboard
                      text={appSecret?.rotatingClientSecret}
                      onCopy={handleCopyCode(setCopyState, 'rotatingClientSecret')}
                    >
                      <Button intent="default">{copyState.rotatingClientSecret}</Button>
                    </CopyToClipboard>
                  ) : (
                    <Button
                      onClick={handleSetShouldFetchSecret(setShouldFetchSecret)}
                      intent="default"
                      disabled={appSecretLoading || !isAdmin}
                      loading={appDetailLoading}
                    >
                      Load Secret
                    </Button>
                  )}
                </Col>
                <Col>
                  <FlexContainer className={elHFull} isFlexAlignCenter>
                    <Button
                      onClick={handleAuthClient(deleteAuthClient, appsDetailRefresh, appSecret, refreshAppSecret)}
                      intent="success"
                      disabled={creatingAuthClient || deleteingAuthClient || !isAdmin}
                      loading={deleteingAuthClient}
                    >
                      Use
                    </Button>
                  </FlexContainer>
                </Col>
              </Grid>
            </>
          )}
        </CardWrap>
      )}
      <Grid>
        {externalId && authFlow === 'authorisationCode' && (
          <Col>
            <FlexContainer>
              <Icon className={elMr4} icon="lockedInfographic" iconSize="medium" />
              <div>
                <Subtitle hasNoMargin>Authentication Client Id</Subtitle>
                <BodyText hasGreyText>{externalId}</BodyText>
              </div>
            </FlexContainer>
            <CopyToClipboard text={externalId} onCopy={handleCopyCode(setCopyState, 'externalId')}>
              <Button intent="default">{copyState.externalId}</Button>
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
              <Button intent="default">{copyState.appId}</Button>
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
            {scopes?.map(({ name, description }) => <PermissionChip key={name}>{description}</PermissionChip>)}
          </Col>
        )}
      </Grid>
    </>
  ) : (
    <PersistentNotification intent="primary" isExpanded isFullWidth isInline>
      No record of this app found
    </PersistentNotification>
  )
}

export default AppDetail
