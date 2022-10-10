import React from 'react'
import * as Sentry from '@sentry/browser'
import { PersistentNotification } from '@reapit/elements'

export interface ErrorState {
  hasFailed: boolean
}

export type ErrorProps = {
  children?: React.ReactNode
}

export class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  static getDerivedStateFromError() {
    return {
      hasFailed: true,
    }
  }

  constructor(props: ErrorProps) {
    super(props)
    this.state = {
      hasFailed: false,
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    const isLocal = window.reapit.config.appEnv === 'local'
    if (!isLocal) {
      Sentry.withScope((scope) => {
        scope.setExtras(info as Record<string, any>)
        Sentry.captureException(error)
      })
    }
  }

  render() {
    if (this.state.hasFailed) {
      return (
        <PersistentNotification isFullWidth isExpanded isInline intent="danger">
          Something went wrong here, try refreshing your page.
        </PersistentNotification>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
