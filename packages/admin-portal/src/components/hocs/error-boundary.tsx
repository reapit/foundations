import * as React from 'react'
import * as Sentry from '@sentry/browser'
import errorMessages from '../../constants/error-messages'
import { notification } from '@reapit/elements'

export interface ErrorState {
  hasFailed: boolean
}

export class ErrorBoundary extends React.Component<{}, ErrorState> {
  static getDerivedStateFromError() {
    return {
      hasFailed: true,
    }
  }

  constructor(props: {}) {
    super(props)
    this.state = {
      hasFailed: false,
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    notification.error({ message: errorMessages.DEFAULT_COMPONENT_ERROR, placement: 'bottomRight' })
    const isLocal = window.reapit.config.appEnv === 'local'
    if (!isLocal) {
      Sentry.withScope(scope => {
        scope.setExtras(info)
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
