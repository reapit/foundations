import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'

const AnalyticsPage: React.SFC = () => {
  return (
    <ErrorBoundary>
      <iframe
        style={{ border: 'none' }}
        src="http://3.8.7.39/#/views/PipelineDemo2/ExecutiveSummary"
        width="100%"
        height="100%"
      />
    </ErrorBoundary>
  )
}

export default AnalyticsPage
