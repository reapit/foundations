import React from 'react'
import * as Sentry from '@sentry/react'
import { PersistantNotification } from '@reapit/elements'

export class ErrorBoundary extends React.Component {
  render() {
    return (
      <Sentry.ErrorBoundary
        fallback={() => (
          <PersistantNotification isFullWidth isExpanded isInline intent="danger">
            Something went wrong here, try refreshing your page.
          </PersistantNotification>
        )}
      >
        {this.props.children}
      </Sentry.ErrorBoundary>
    )
  }
}

export default ErrorBoundary
