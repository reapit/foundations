import * as React from 'react'
import { useHistory } from 'react-router'
import { FlexContainerBasic, Alert } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { UnsupportBrowserPopUp } from '@/components/ui/unsupport-browser-pop-up'
import { IFRAME_URLS } from '../../constants/iframe-urls'
import Routes from '../../constants/routes'
import { isIE } from '@/utils/browser'

export const parseIframeUrl = (pathname: string, hash: string): string => {
  const path = pathname.split(Routes.DEVELOPER_API_DOCS)[1]
  return `${path}${hash}`
}

export const checkIframeLoad = (
  event: React.SyntheticEvent<HTMLIFrameElement, Event>,
  setIframeFailed: (iframeFailed: boolean) => void,
) => {
  if (window.reapit.config.appEnv === 'local') return

  const iframe = event.target as HTMLIFrameElement

  if (!iframe || !iframe.contentWindow) return

  const gitbookContent = iframe.contentWindow.document.getElementById('__GITBOOK__ROOT__CLIENT__')

  if (!gitbookContent) {
    setIframeFailed(true)
  }
}

const ApiDocsPage: React.FC = () => {
  const { location } = useHistory()
  const iframeUrl = `${IFRAME_URLS.documentation}${parseIframeUrl(location.pathname, location.hash)}`
  const [iframeFailed, setIframeFailed] = React.useState(false)
  const onIframeLoad = (event: React.SyntheticEvent<HTMLIFrameElement, Event>) =>
    checkIframeLoad(event, setIframeFailed)

  return (
    <ErrorBoundary>
      <FlexContainerBasic flexColumn hasPadding className="is-full-height">
        {iframeFailed && (
          <Alert
            type="info"
            message={
              <>
                We are aware of an itermittent issue where our documentation fails to load on this page. Apologies if
                you see this - we are actively working on a fix. You can still visit the{' '}
                <a href={iframeUrl} target="_blank" rel="noreferrer">
                  standalone documentation app here
                </a>{' '}
                while we address this issue
              </>
            }
          />
        )}
        <FlexContainerBasic className="container is-full-height">
          {!isIE() && (
            <iframe style={{ border: 'none' }} src={iframeUrl} width="100%" height="100%" onLoad={onIframeLoad} />
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
