import * as React from 'react'
import { useHistory, useLocation } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import Routes from '@/constants/routes'
import { IFRAME_URLS } from '@/constants/iframe-urls'
import { elHFull, FlexContainer, PageContainer, SecondaryNav, SecondaryNavContainer, Title } from '@reapit/elements'
import { SecondaryNavItem } from '@reapit/elements'
import { navigate } from '../../ui/menu'
import { iframeWrapper } from './__styles__/index'

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
          <SecondaryNav>
            <SecondaryNavItem onClick={navigate(history, Routes.API_DOCS)} active={pathname === Routes.API_DOCS}>
              API Docs
            </SecondaryNavItem>
            <SecondaryNavItem onClick={navigate(history, Routes.ELEMENTS)} active={pathname === Routes.ELEMENTS}>
              Elements
            </SecondaryNavItem>
          </SecondaryNav>
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
