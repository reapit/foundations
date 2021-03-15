import * as React from 'react'
import * as Sentry from '@sentry/browser'
import errorMessages from '@/constants/error-messages'
import { notification } from '@reapit/elements'

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
    notification.error({ message: errorMessages.DEFAULT_COMPONENT_ERROR })
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
      return <p>Something went wrong here, try refreshing your page.</p>
    }

    return this.props.children
  }
}

export default ErrorBoundary
