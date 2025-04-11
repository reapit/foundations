import React, { FC } from 'react'
import { useNavigate, useLocation } from 'react-router'
import ErrorBoundary from '../../core/error-boundary'
import Routes from '../../constants/routes'
import { IFRAME_URLS } from '../../constants/iframe-urls'
import {
  SmallText,
  Button,
  elHFull,
  elMb5,
  elMb9,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  BodyText,
  Title,
} from '@reapit/elements'
import { iframeWrapper } from './__styles__/index'
import { openNewPage, ExternalPages, navigateRoute } from '../../utils/navigation'

export const parseIframeUrl = (pathname: string, hash: string): string => {
  const documentPagePath = pathname.split(Routes.API_DOCS)[1]
  return `${documentPagePath}${hash}`
}

const DocsPage: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { pathname } = location
  const isDevEnv = process.env.appEnv !== 'production' // Feature flagging until prod is ready
  const isDocsPage = pathname.includes(Routes.API_DOCS)
  const isSchemaPage = pathname.includes(Routes.ANALYTICS_SCHEMA_DOCS)
  const iframeUri = isDocsPage
    ? `${IFRAME_URLS.documentation}${parseIframeUrl(location.pathname, location.hash)}`
    : process.env.analyticsSchemaDocsUrl

  return (
    <ErrorBoundary>
      <FlexContainer isFlexAuto>
        <SecondaryNavContainer>
          <SecondaryNav className={elMb9}>
            <SecondaryNavItem onClick={navigateRoute(navigate, Routes.API_DOCS)} active={isDocsPage}>
              APIs
            </SecondaryNavItem>
            <SecondaryNavItem onClick={navigateRoute(navigate, Routes.ANALYTICS_SCHEMA_DOCS)} active={isSchemaPage}>
              Warehouse
            </SecondaryNavItem>
          </SecondaryNav>
          <Icon className={elMb5} icon="apiDocsInfographic" iconSize="large" />
          <BodyText>Welcome</BodyText>
          <SmallText tag="div" hasGreyText>
            We have provided comprehensive documentation for all of our APIs, services, tooling and open source packages
            accross these pages.
          </SmallText>
          <SmallText tag="div" hasGreyText>
            You can also visit us on Github where you can raise and track issues, look at code examples and view our
            milestones.
          </SmallText>
          <Button className={elMb5} intent="default" onClick={openNewPage(ExternalPages.github)}>
            Go to Github
          </Button>
          {isDocsPage && (
            <Button className={elMb5} intent="primary" onClick={openNewPage(ExternalPages.baseDocs)}>
              Open Docs
            </Button>
          )}
          {isSchemaPage && isDevEnv && (
            <Button className={elMb5} intent="primary" onClick={openNewPage(process.env.analyticsSchemaDocsUrl)}>
              Open Schema
            </Button>
          )}
        </SecondaryNavContainer>
        <PageContainer className={elHFull}>
          <Title>{isDocsPage ? 'API Docs' : 'Analytics Schema Docs'}</Title>
          <iframe className={iframeWrapper} frameBorder="0" src={iframeUri} />
        </PageContainer>
      </FlexContainer>
    </ErrorBoundary>
  )
}

export default DocsPage
