import * as React from 'react'
import { FlexContainerBasic } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { IFRAME_URLS } from '../../constants/iframe-urls'

const ApiDocsPage: React.FC = () => (
  <ErrorBoundary>
    <FlexContainerBasic flexColumn hasPadding>
      <FlexContainerBasic className="container">
        <iframe style={{ border: 'none' }} src={IFRAME_URLS.documentation} width="100%" height="100%" />
      </FlexContainerBasic>
    </FlexContainerBasic>
  </ErrorBoundary>
)

export default ApiDocsPage
