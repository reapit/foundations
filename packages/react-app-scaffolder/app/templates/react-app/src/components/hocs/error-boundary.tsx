import React from 'react'
import * as Sentry from '@sentry/react'
import { PersistentNotification } from '@reapit/elements'

export class ErrorBoundary extends React.Component {
  render() {
    return (
      <Sentry.ErrorBoundary
        fallback={() => (
          <PersistentNotification isFullWidth isExpanded intent="danger">
            Something went wrong here, try refreshing your page.
          </PersistentNotification>
        )}
      >
        {this.props.children}
      </Sentry.ErrorBoundary>
    )
  }
}

export default ErrorBoundary
