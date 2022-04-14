import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import ErrorBoundary from '../../core/error-boundary'
import Routes from '../../constants/routes'
import {
  Button,
  elBorderRadius,
  elHFull,
  elMb5,
  elMb8,
  elMb9,
  elWFull,
  FlexContainer,
  Icon,
  InputGroup,
  Label,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Select,
  SmallText,
  Subtitle,
  Title,
} from '@reapit/elements'
import { ExternalPages, navigate, openNewPage } from '../../utils/navigation'
import { Route, Switch, useLocation } from 'react-router-dom'
import WebhooksPage from '../webhooks'
import DesktopPage from '../desktop'
import GraphQLPage from '../graphql'
import SwaggerPage from '../swagger'
import { cx } from '@linaria/core'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { ControlsContainer } from '../webhooks/__styles__'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { ProductModelPagedResult } from '@reapit/foundations-ts-definitions'
import WebhooksControls from '../webhooks/webhooks-controls'
import { useWebhooksState } from '../webhooks/state/use-webhooks-state'

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

export const ApiPage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { webhooksDataState } = useWebhooksState()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [swaggerUri, setSwaggerUri] = useState<string | null>(null)

  const [productsList] = useReapitGet<ProductModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getProducts],
  })

  useEffect(handleDefaultSwaggerDoc(setSwaggerUri, productsList, connectSession), [productsList, connectSession])

  const { apps } = webhooksDataState
  const { pathname } = location
  const isSwaggerPage = pathname === Routes.SWAGGER
  const isWebhooksPage = pathname.includes(Routes.WEBHOOKS)
  const isGrapQlPage = pathname === Routes.GRAPHQL
  const isDesktopPage = pathname === Routes.DESKTOP
  const isAboutPage = pathname === Routes.WEBHOOKS_ABOUT
  const isManagePage = pathname === Routes.WEBHOOKS_MANAGE
  const isLogsPage = pathname === Routes.WEBHOOKS_LOGS

  return (
    <ErrorBoundary>
      <FlexContainer isFlexAuto>
        <SecondaryNavContainer>
          <Title>API</Title>
          <SecondaryNav className={elMb9}>
            <SecondaryNavItem onClick={navigate(history, Routes.SWAGGER)} active={isSwaggerPage}>
              REST API
            </SecondaryNavItem>
            <SecondaryNavItem onClick={navigate(history, Routes.WEBHOOKS_ABOUT)} active={isWebhooksPage}>
              Webhooks
            </SecondaryNavItem>
            <SecondaryNavItem onClick={navigate(history, Routes.GRAPHQL)} active={isGrapQlPage}>
              GraphQL
            </SecondaryNavItem>
            <SecondaryNavItem onClick={navigate(history, Routes.DESKTOP)} active={isDesktopPage}>
              Desktop
            </SecondaryNavItem>
          </SecondaryNav>
          {isSwaggerPage && (
            <>
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
                    Reapit now supports multiple products in the Developer Portal, each with a corresponding API
                    document. For most developers the default will be Agency Cloud but if you wish to select a different
                    product API you can do this below.
                  </SmallText>
                  <ControlsContainer className={cx(elBorderRadius, elMb5)}>
                    <InputGroup>
                      <Select
                        className={elWFull}
                        value={swaggerUri ?? ''}
                        onChange={handleChangeSwaggerDoc(setSwaggerUri)}
                      >
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
                <SmallText hasGreyText>
                  This tool is interactive and provides instant access to data hosted in our sandbox environment with
                  authentication and versioning headers pre-populated. Example requests and responses are shown by
                  default but you can switch to view a fully documented schema - look for the model link.
                </SmallText>
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
            </>
          )}
          {isGrapQlPage && (
            <>
              <Icon className={elMb5} icon="graphQlInfographic" iconSize="large" />
              <Subtitle>GraphQL Playground</Subtitle>
              <SmallText hasGreyText>
                GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.
                GraphQL gives clients the power to ask for exactly what they need and nothing more, makes it easier to
                evolve APIs over time, and enables powerful developer tools.
              </SmallText>
              <Button className={elMb5} intent="neutral" onClick={openNewPage(ExternalPages.graphQLDocs)}>
                View Docs
              </Button>
              <Button className={elMb5} intent="critical" onClick={openNewPage(window.reapit.config.graphQLUri)}>
                Open New
              </Button>
            </>
          )}
          {isAboutPage && (
            <>
              <Icon className={elMb5} icon="webhooksInfographic" iconSize="large" />
              <Subtitle>Webhooks Documentation</Subtitle>
              <SmallText hasGreyText>
                This system is designed to flexibly work with how your application is built and deployed. If you wish,
                you can set up a single endpoint to catch all topics for all customers. Alternatively, you may wish to
                set up a different webhook subscription per topic or per customer. For more information about Webhooks,
                please see our documentation.
              </SmallText>
              <Button className={elMb5} intent="neutral" onClick={openNewPage(ExternalPages.webhooksDocs)}>
                View Docs
              </Button>
            </>
          )}
          {(isManagePage || isLogsPage) && (
            <div className={elMb8}>
              <Label>
                {isManagePage
                  ? 'Please select an App from the list below to view the associated Webhooks'
                  : 'Please select a Time slot and an App from the list below to view the associated Webhooks. Please note, we only support a range of times up to 6 months.'}
              </Label>
            </div>
          )}
          {isWebhooksPage && apps?.data && <WebhooksControls />}
        </SecondaryNavContainer>
        <PageContainer className={elHFull}>
          <ErrorBoundary>
            <Switch>
              <Route path={Routes.SWAGGER} exact component={() => <SwaggerPage swaggerUri={swaggerUri} />} />
              <Route path={Routes.WEBHOOKS} component={WebhooksPage} />
              <Route path={Routes.GRAPHQL} exact component={GraphQLPage} />
              <Route path={Routes.DESKTOP} exact component={DesktopPage} />
            </Switch>
          </ErrorBoundary>
        </PageContainer>
      </FlexContainer>
    </ErrorBoundary>
  )
}

export default ApiPage
