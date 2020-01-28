import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { Content, FlexContainerBasic, FlexContainerResponsive, H3 } from '@reapit/elements'

const ElementsPage: React.SFC = () => (
  <ErrorBoundary>
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <H3>Elements </H3>
          <p>
            Elements is a React UI Component and utility library we have developed internally and open sourced. The
            Developer Portal and Marketplace itself uses Elements extensively and if you are building a React app to be
            installed by clients, we recommend you do too.
          </p>
          <p>
            When using this page, you can toggle between code examples and rendered output of components by using the
            &lsquo;Canvas&rsquo; and &lsquo;Docs&rsquo; tabs. For general usage and other NPM packages, visit the
            package documentation.
          </p>
        </FlexContainerResponsive>
      </Content>
      <FlexContainerBasic className="container">
        <iframe style={{ border: 'none' }} src="https://reapit.github.io/elements/" width="100%" height="100%" />
      </FlexContainerBasic>
    </FlexContainerBasic>
  </ErrorBoundary>
)

export default ElementsPage
