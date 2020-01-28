import * as React from 'react'
import { FlexContainerResponsive, Content, H3, FlexContainerBasic } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'

const ApiDocsPage: React.FC = () => (
  <ErrorBoundary>
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <H3>Foundations Documentation</H3>
        </FlexContainerResponsive>
      </Content>
      <FlexContainerBasic className="container">
        <iframe
          style={{ border: 'none' }}
          src="https://wmcvay.gitbook.io/reapit-foundations/"
          width="100%"
          height="100%"
        />
      </FlexContainerBasic>
    </FlexContainerBasic>
  </ErrorBoundary>
)

export default ApiDocsPage
