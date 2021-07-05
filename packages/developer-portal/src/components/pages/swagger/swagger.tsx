import React, { FC } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { swagger } from './__styles__/swagger'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { StringMap } from '@reapit/elements-legacy'
import { SandboxPopUp } from '@/components/ui/popup/sandbox-pop-up'
import { URLS } from '../../../services/constants'
import { FlexContainer, Loader, SecondaryNav, SecondaryNavContainer, SecondaryNavItem } from '@reapit/elements'
import Routes from '../../../constants/routes'
import { navigate } from '../../ui/menu'
import { useHistory, useLocation } from 'react-router'
import { cx } from 'linaria'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'

export type InterceptorParams = {
  url: string
  headers: StringMap
}

export const handleOnComplete = (setLoading) => () => {
  // dynamically changing link text for visibility
  const linkElement = document.querySelector('a[href="https://dev.platform.reapit.cloud/docs"]')
  if (linkElement) {
    linkElement.innerHTML = '<span class="url">OpenAPI Specification</span>'
  }
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
  const [loading, setLoading] = React.useState(true)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const requestInterceptor = (params: InterceptorParams) => fetchInterceptor(params, connectSession?.accessToken)
  const location = useLocation()
  const history = useHistory()
  const { pathname } = location

  return (
    <ErrorBoundary>
      <FlexContainer isFlexInitial>
        <SecondaryNavContainer>
          <SecondaryNav>
            <SecondaryNavItem onClick={navigate(history, Routes.SWAGGER)} active={pathname === Routes.SWAGGER}>
              Foundations API
            </SecondaryNavItem>
            <SecondaryNavItem onClick={navigate(history, Routes.GRAPHQL)} active={pathname === Routes.GRAPHQL}>
              GraphQL
            </SecondaryNavItem>
          </SecondaryNav>
        </SecondaryNavContainer>
        {(loading || !connectSession?.accessToken) && <Loader label="Loading" fullPage />}
        <div className={cx(swagger, `${loading ? 'swagger-loading' : ''}`)}>
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
