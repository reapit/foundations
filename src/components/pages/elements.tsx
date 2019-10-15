import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'

const SwaggerPage: React.SFC = () => (
  <ErrorBoundary>
    <iframe style={{ border: 'none' }} src="https://reapit.github.io/elements/" width="100%" height="100%" />
  </ErrorBoundary>
)

export default SwaggerPage
