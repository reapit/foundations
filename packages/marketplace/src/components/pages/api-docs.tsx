import * as React from 'react'
import { useHistory } from 'react-router'
import { FlexContainerBasic } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { UnsupportBrowserPopUp } from '@/components/ui/unsupport-browser-pop-up'
import { IFRAME_URLS } from '../../constants/iframe-urls'
import Routes from '../../constants/routes'
import { isIE } from '@/utils/browser'

export const parseIframeUrl = (pathname: string, hash: string): string => {
  const path = pathname.split(Routes.DEVELOPER_API_DOCS)[1]
  return `${path}${hash}`
}

const ApiDocsPage: React.FC = () => {
  const { location } = useHistory()
  const isXIFrame = window.reapit.config.appEnv !== 'local' ? 'x-frame-bypass' : ''

  return (
    <ErrorBoundary>
      <FlexContainerBasic flexColumn hasPadding className="is-full-height">
        <FlexContainerBasic className="container is-full-height">
          {!isIE() && (
            <iframe
              is={isXIFrame}
              style={{ border: 'none' }}
              src={`${IFRAME_URLS.documentation}${parseIframeUrl(location.pathname, location.hash)}`}
              width="100%"
              height="100%"
            />
          )}
        </FlexContainerBasic>
      </FlexContainerBasic>
      <UnsupportBrowserPopUp
        unsupported={isIE()}
        // eslint-disable-next-line
        message="Unsupported Browser - Unfortunately as Internet Explorer 11 is no longer supported, we are unable to display the documentation, please login to the Developer Portal using either Chrome, Firefox, Safari or Edge"
      />
    </ErrorBoundary>
  )
}

export default ApiDocsPage
