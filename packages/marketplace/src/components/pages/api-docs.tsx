import * as React from 'react'
import { useHistory } from 'react-router'
import { FlexContainerBasic } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { IFRAME_URLS } from '../../constants/iframe-urls'
import Routes from '../../constants/routes'

export const parseIframeUrl = (pathname: string, hash: string): string => {
  const path = pathname.split(Routes.DEVELOPER_API_DOCS)[1]
  return `${path}${hash}`
}

const ApiDocsPage: React.FC = () => {
  const { location } = useHistory()

  return (
    <ErrorBoundary>
      <FlexContainerBasic flexColumn hasPadding className="is-full-height">
        <FlexContainerBasic className="container is-full-height">
          <iframe
            style={{ border: 'none' }}
            src={`${IFRAME_URLS.documentation}${parseIframeUrl(location.pathname, location.hash)}`}
            width="100%"
            height="100%"
          />
        </FlexContainerBasic>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default ApiDocsPage
