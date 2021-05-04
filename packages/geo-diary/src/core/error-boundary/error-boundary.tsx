import * as React from 'react'
import * as Sentry from '@sentry/browser'
import { notification, Helper } from '@reapit/elements'

export interface ErrorState {
  hasFailed: boolean
}

export type ErrorProps = {
  children?: React.ReactNode
}

export class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props)
    this.state = {
      hasFailed: false,
    }
  }

  static getDerivedStateFromError() {
    return {
      hasFailed: true,
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ERROR BOUNDARY CAUGHT', error.message, info)
    const isLocal = window.reapit.config.appEnv === 'local'
    if (!isLocal) {
      Sentry.withScope((scope) => {
        scope.setExtras(info as Record<string, any>)
        Sentry.captureException(error)
      })
    }
    notification.error({ message: error.message })
  }

  render() {
    if (this.state.hasFailed) {
      return <Helper variant="warning">Something went wrong here, try refreshing your page.</Helper>
    }

    return this.props.children
  }
}

export default ErrorBoundary
