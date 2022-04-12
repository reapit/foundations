/* istanbul ignore file */
// Can't add tests to this file because of the way Jest transpiles Swagger UI throws an error
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { swagger, titleWrap, swaggerHidden } from './__styles__/swagger'
import ErrorBoundary from '@/core/error-boundary'
import { StringMap } from '@reapit/elements-legacy'
import {
  SmallText,
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
  elBorderRadius,
  InputGroup,
  Select,
  BodyText,
  elMx9,
  PersistantNotification,
} from '@reapit/elements'
import Routes from '../../constants/routes'
import { useHistory, useLocation } from 'react-router'
import { cx } from '@linaria/core'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { ExternalPages, navigate, openNewPage } from '../../utils/navigation'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { ProductModelPagedResult } from '@reapit/foundations-ts-definitions'
import { ControlsContainer } from '../webhooks/__styles__'

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

export const handleChangeSwaggerDoc =
  (setSwaggerUri: Dispatch<SetStateAction<string | null>>) => (event: ChangeEvent<HTMLSelectElement>) => {
    const swaggerUri = event.target.value
    setSwaggerUri(swaggerUri)
  }

export const handleDefaultSwaggerDoc =
  (
    setSwaggerUri: Dispatch<SetStateAction<string | null>>,
    productsList: ProductModelPagedResult | null,
    connectSession: ReapitConnectSession | null,
  ) =>
  () => {
    const orgProduct = connectSession?.loginIdentity.orgProduct
    if (!orgProduct || !productsList) return
    const swaggerUri = productsList.data?.find((product) => product.id === orgProduct)?.openApiUrl ?? null
    setSwaggerUri(swaggerUri)
  }

export const handleSandboxTimeout = (setSandboxVisible: Dispatch<SetStateAction<boolean>>) => () => {
  const timeout = setTimeout(() => {
    setSandboxVisible(false)
  }, 5000)

  return () => clearTimeout(timeout)
}

export const handleSandboxClick =
  (setSandboxVisible: Dispatch<SetStateAction<boolean>>, sandboxVisibile: boolean) => () => {
    setSandboxVisible(!sandboxVisibile)
  }

export const SwaggerPage: FC = () => {
  const [loading, setLoading] = useState(true)
  const [sandboxVisible, setSandboxVisible] = useState(true)
  const [swaggerUri, setSwaggerUri] = useState<string | null>(null)
  const [productsList] = useReapitGet<ProductModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getProducts],
  })
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  useEffect(handleDefaultSwaggerDoc(setSwaggerUri, productsList, connectSession), [productsList, connectSession])
  useEffect(handleSandboxTimeout(setSandboxVisible), [])

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
            <SecondaryNavItem onClick={navigate(history, Routes.DESKTOP)} active={pathname === Routes.DESKTOP}>
              Desktop
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
          {window.reapit.config.appEnv !== 'production' ? (
            <>
              <SmallText hasGreyText>
                Reapit now supports multiple products in the Developer Portal, each with a corresponding API document.
                For most developers the default will be Agency Cloud but if you wish to select a different product API
                you can do this below.
              </SmallText>
              <ControlsContainer className={cx(elBorderRadius, elMb5)}>
                <InputGroup>
                  <Select className={elWFull} value={swaggerUri ?? ''} onChange={handleChangeSwaggerDoc(setSwaggerUri)}>
                    {productsList?.data?.map((option) => (
                      <option key={option.id} value={option.openApiUrl}>
                        {option.name}
                      </option>
                    ))}
                  </Select>
                  <Label htmlFor="myId">Select Product</Label>
                </InputGroup>
              </ControlsContainer>
            </>
          ) : (
            <BodyText hasGreyText>
              This tool is interactive and provides instant access to data hosted in our sandbox environment with
              authentication and versioning headers pre-populated. Example requests and responses are shown by default
              but you can switch to view a fully documented schema - look for the model link.
            </BodyText>
          )}
          <Button className={elMb5} intent="neutral" onClick={openNewPage(ExternalPages.platformAPIDocs)}>
            View Docs
          </Button>
          <Button className={elMb5} intent="neutral" onClick={openNewPage(swaggerUri ?? '')}>
            Download Spec
          </Button>
          <Button className={elMb5} intent="neutral" onClick={openNewPage(ExternalPages.glossaryDocs)}>
            See Glossary
          </Button>
        </SecondaryNavContainer>
        {(loading || !connectSession?.accessToken || !swaggerUri) && <Loader fullPage />}
        <div className={cx(swagger, (loading || !swaggerUri) && swaggerHidden)}>
          <Title className={titleWrap}>Foundations API</Title>
          {window.reapit.config.appEnv !== 'production' && (
            <BodyText className={elMx9} hasGreyText>
              This tool is interactive and provides instant access to data hosted in our sandbox environment with
              authentication and versioning headers pre-populated. Example requests and responses are shown by default
              but you can switch to view a fully documented schema - look for the model link.
            </BodyText>
          )}
          <SwaggerUI
            url={swaggerUri}
            onComplete={handleOnComplete(setLoading)}
            docExpansion="none"
            requestInterceptor={requestInterceptor}
          />
          <PersistantNotification
            onClick={handleSandboxClick(setSandboxVisible, sandboxVisible)}
            isExpanded={sandboxVisible}
            intent="primary"
          >
            This is a sandbox environment, with anonymised test data and isolated from production
          </PersistantNotification>
        </div>
      </FlexContainer>
    </ErrorBoundary>
  )
}

export default SwaggerPage
