import * as React from 'react'
import { notification, Helper } from '@reapit/elements'
import { logger } from '@reapit/utils'

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
      logger(error)
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
