import * as React from 'react'
import { useHistory } from 'react-router'
import { FlexContainerBasic } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { UnsupportBrowerPopUp } from '@/components/ui/unsupport-brower-pop-up'
import { IFRAME_URLS } from '../../constants/iframe-urls'
import Routes from '../../constants/routes'
import { isIE } from '@/utils/brower'

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
          {!isIE() && (
            <iframe
              style={{ border: 'none' }}
              src={`${IFRAME_URLS.documentation}${parseIframeUrl(location.pathname, location.hash)}`}
              width="100%"
              height="100%"
            />
          )}
        </FlexContainerBasic>
      </FlexContainerBasic>
      <UnsupportBrowerPopUp unsupported={isIE()} />
    </ErrorBoundary>
  )
}

export default ApiDocsPage
