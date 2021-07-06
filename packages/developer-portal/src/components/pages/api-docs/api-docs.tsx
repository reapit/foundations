import * as React from 'react'
import { useHistory, useLocation } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import Routes from '@/constants/routes'
import { IFRAME_URLS } from '@/constants/iframe-urls'
import {
  BodyText,
  Button,
  elHFull,
  elMb3,
  elMb8,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  Subtitle,
  Title,
} from '@reapit/elements'
import { SecondaryNavItem } from '@reapit/elements'
import { iframeWrapper } from './__styles__/index'
import { openNewPage, ExternalPages, navigate } from '../../../utils/navigation'

export const parseIframeUrl = (pathname: string, hash: string): string => {
  const documentPagePath = pathname.split(Routes.API_DOCS)[1]
  return `${documentPagePath}${hash}`
}

const ApiDocsPage: React.FC = () => {
  const location = useLocation()
  const history = useHistory()
  const { pathname } = location
  return (
    <ErrorBoundary>
      <FlexContainer isFlexAuto>
        <SecondaryNavContainer>
          <SecondaryNav className={elMb8}>
            <SecondaryNavItem onClick={navigate(history, Routes.API_DOCS)} active={pathname === Routes.API_DOCS}>
              API Docs
            </SecondaryNavItem>
            <SecondaryNavItem onClick={navigate(history, Routes.ELEMENTS)} active={pathname === Routes.ELEMENTS}>
              Elements
            </SecondaryNavItem>
          </SecondaryNav>
          <Icon icon="apiDocsInfographic" iconSize="large" />
          <Subtitle>Welcome</Subtitle>
          <BodyText hasGreyText>
            API usage documentation is split between the Foundations REST API for querying the Reapit data platform, the
            Desktop API which is relevant to interactions between web-apps and Reapit Agency Cloud, the Reapit Connect
            OAuth single sign on service, and finally, the NPM packages we support for web development. We provide a
            Glossary of useful terminology, FAQs, information about terms, pricing and a &lsquo;What&apos;s New&rsquo;
            section.
          </BodyText>
          <BodyText hasGreyText>
            You can also visit our open source project on Githb where you can raise and track issues, look at code
            examples and view our milestones.
          </BodyText>
          <Button className={elMb3} intent="neutral" onClick={openNewPage(ExternalPages.github)}>
            Go to Github
          </Button>
          <Button className={elMb3} intent="critical" onClick={openNewPage(ExternalPages.baseDocs)}>
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
