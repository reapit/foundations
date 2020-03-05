import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { FlexContainerBasic } from '@reapit/elements'

const ElementsPage: React.SFC = () => (
  <ErrorBoundary>
    <FlexContainerBasic flexColumn hasPadding>
      <FlexContainerBasic className="container">
        <iframe
          style={{ border: 'none', height: '100%' }}
          scrolling="no"
          src={process.env.ELEMENTS_DOCUMENT_URL}
          width="100%"
          height="100%"
        />
      </FlexContainerBasic>
    </FlexContainerBasic>
  </ErrorBoundary>
)

export default ElementsPage
