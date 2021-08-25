import * as React from 'react'
import { useLocation } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import Routes from '@/constants/routes'
import { IFRAME_URLS } from '@/constants/iframe-urls'
import {
  BodyText,
  Button,
  elHFull,
  elMb5,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNavContainer,
  Subtitle,
  Title,
} from '@reapit/elements'
import { iframeWrapper } from './__styles__/index'
import { openNewPage, ExternalPages } from '../../../utils/navigation'

export const parseIframeUrl = (pathname: string, hash: string): string => {
  const documentPagePath = pathname.split(Routes.API_DOCS)[1]
  return `${documentPagePath}${hash}`
}

const ApiDocsPage: React.FC = () => {
  const location = useLocation()
  return (
    <ErrorBoundary>
      <FlexContainer isFlexAuto>
        <SecondaryNavContainer>
          <Title>Docs</Title>
          <Icon className={elMb5} icon="apiDocsInfographic" iconSize="large" />
          <Subtitle>Welcome</Subtitle>
          <BodyText hasGreyText>
            We have provided comprehensive documentation for all of our APIs, services, tooling and open source packages
            accross these pages.
          </BodyText>
          <BodyText hasGreyText>
            You can also visit us on Github where you can raise and track issues, look at code examples and view our
            milestones.
          </BodyText>
          <Button className={elMb5} intent="neutral" onClick={openNewPage(ExternalPages.github)}>
            Go to Github
          </Button>
          <Button className={elMb5} intent="critical" onClick={openNewPage(ExternalPages.baseDocs)}>
            Open New
          </Button>
        </SecondaryNavContainer>
        <PageContainer className={elHFull}>
          <Title>API Docs</Title>
          <iframe
            className={iframeWrapper}
            frameBorder="0"
            src={`${IFRAME_URLS.documentation}${parseIframeUrl(location.pathname, location.hash)}`}
          />
        </PageContainer>
      </FlexContainer>
    </ErrorBoundary>
  )
}

export default ApiDocsPage
