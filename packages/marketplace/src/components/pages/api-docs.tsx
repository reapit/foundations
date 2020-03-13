import * as React from 'react'
import { useHistory } from 'react-router'
import { FlexContainerBasic } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { IFRAME_URLS } from '../../constants/iframe-urls'

export const parseIframeUrl = (hash: string): string => {
  switch (hash) {
    case '#api':
      return '/api'
    case '#api-documentation':
      return '/api/api-documentation'
    case '#reapit-connect':
      return '/api/reapit-connect'
    case '#web':
      return '/api/web'
    case '#desktop-api':
      return '/api/desktop-api'
    case '#open-source':
      return '/open-source'
    case '#contributing':
      return '/open-source/contributing'
    case '#packages':
      return '/open-source/packages'
    case '#whats-new':
      return '/whats-new'
    case '#platform-changelog':
      return '/whats-new/platform-changelog'
    case '#developer-portal':
      return '/developer-portal'
    default:
      return '/'
  }
}

const ApiDocsPage: React.FC = () => {
  const { location } = useHistory()
  return (
    <ErrorBoundary>
      <FlexContainerBasic flexColumn hasPadding className="is-full-height">
        <FlexContainerBasic className="container is-full-height">
          <iframe
            style={{ border: 'none' }}
            src={`${IFRAME_URLS.documentation}${parseIframeUrl(location.hash)}`}
            width="100%"
            height="100%"
          />
        </FlexContainerBasic>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default ApiDocsPage
