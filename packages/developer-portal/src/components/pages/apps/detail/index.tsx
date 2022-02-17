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
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { PermissionChip } from './__styles__'

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

export const handleCopyCode = (copyState: Dispatch<SetStateAction<CopyState>>, key: keyof CopyState) => () => {
  copyState({
    ...defaultCopyState,
    [key]: 'Copied',
  })

  setTimeout(() => {
    copyState((currentState) => ({
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
    : 'Your app is incomplete and in development only'
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
              <div>
                <Subtitle hasNoMargin>Authentication Client Secret</Subtitle>
                <BodyText hasGreyText>{externalId}</BodyText>
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
                <BodyText hasGreyText>{id}</BodyText>
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
              <BodyText key={uri} hasGreyText hasNoMargin>
                {uri}
              </BodyText>
            ))}
          </Col>
        )}
        {authFlow === 'authorisationCode' && Boolean(signoutUris?.length) && (
          <Col>
            <Subtitle hasNoMargin>Sign Out Uri(s)</Subtitle>
            {signoutUris?.map((uri) => (
              <BodyText key={uri} hasGreyText hasNoMargin>
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
