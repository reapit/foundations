import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { swagger, titleWrap, swaggerHidden } from './__styles__/swagger'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { StringMap } from '@reapit/elements-legacy'
import { SandboxPopUp } from '@/components/ui/popup/sandbox-pop-up'
import { URLS } from '../../../services/constants'
import {
  BodyText,
  elWFull,
  FlexContainer,
  Loader,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Title,
  Subtitle,
  Icon,
  elMb9,
  elMb5,
  Button,
  Label,
} from '@reapit/elements'
import Routes from '../../../constants/routes'
import { useHistory, useLocation } from 'react-router'
import { cx } from '@linaria/core'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { ExternalPages, navigate, openNewPage } from '../../../utils/navigation'

export type InterceptorParams = {
  url: string
  headers: StringMap
}

export const handleOnComplete = (setLoading: Dispatch<SetStateAction<boolean>>) => () => {
  setLoading(false)
}

export const fetchInterceptor = (params: InterceptorParams, accessToken?: string | null) => {
  if (!accessToken) {
    return
  }

  return {
    ...params,
    headers: {
      ...params.headers,
      'api-version': '2020-01-31',
      Authorization: `Bearer ${accessToken}`,
    },
  }
}

export const SwaggerPage: FC = () => {
  const [loading, setLoading] = useState(true)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const requestInterceptor = (params: InterceptorParams) => fetchInterceptor(params, connectSession?.accessToken)
  const location = useLocation()
  const history = useHistory()
  const { pathname } = location

  return (
    <ErrorBoundary>
      <FlexContainer className={elWFull} isFlexInitial>
        <SecondaryNavContainer>
          <Title>API</Title>
          <SecondaryNav className={elMb9}>
            <SecondaryNavItem onClick={navigate(history, Routes.SWAGGER)} active={pathname === Routes.SWAGGER}>
              REST API
            </SecondaryNavItem>
            <SecondaryNavItem onClick={navigate(history, Routes.WEBHOOKS_ABOUT)} active={pathname.includes('webhooks')}>
              Webhooks
            </SecondaryNavItem>
            <SecondaryNavItem onClick={navigate(history, Routes.GRAPHQL)} active={pathname === Routes.GRAPHQL}>
              GraphQL
            </SecondaryNavItem>
          </SecondaryNav>
          <Icon className={elMb5} icon="apiInfographic" iconSize="large" />
          <Subtitle>Open API Specification</Subtitle>
          <div>
            <Label>API Version</Label>
            <p className={elMb5}>2020-01-31</p>
          </div>
          <div>
            <Label>API Location</Label>
            <p className={elMb5}>https://platform.reapit.cloud</p>
          </div>
          <BodyText hasGreyText>
            This tool is interactive and provides instant access to data hosted in our sandbox environment with
            authentication and versioning headers pre-populated. Example requests and responses are shown by default but
            you can switch to view a fully documented schema - look for the model link.
          </BodyText>
          <Button className={elMb5} intent="neutral" onClick={openNewPage(ExternalPages.platformAPIDocs)}>
            View Docs
          </Button>
          <Button
            className={elMb5}
            intent="neutral"
            onClick={openNewPage(`${window.reapit.config.platformApiUrl}/docs`)}
          >
            Download Spec
          </Button>
          <Button className={elMb5} intent="neutral" onClick={navigate(history, Routes.HELP)}>
            See Help
          </Button>
          <Button className={elMb5} intent="neutral" onClick={openNewPage(ExternalPages.glossaryDocs)}>
            See Glossary
          </Button>
        </SecondaryNavContainer>
        {(loading || !connectSession?.accessToken) && <Loader label="Loading" fullPage />}
        <div className={cx(swagger, loading && swaggerHidden)}>
          <Title className={titleWrap}>Foundations API</Title>
          <SwaggerUI
            url={`${window.reapit.config.platformApiUrl}${URLS.docs}`}
            onComplete={handleOnComplete(setLoading)}
            docExpansion="none"
            requestInterceptor={requestInterceptor}
          />

          <SandboxPopUp loading={loading} />
        </div>
      </FlexContainer>
    </ErrorBoundary>
  )
}

export default SwaggerPage
