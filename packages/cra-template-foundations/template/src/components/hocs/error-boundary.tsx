import { PersistantNotification } from '@reapit/elements'
import React, { Component } from 'react'

export interface ErrorState {
  hasFailed: boolean
}

export class ErrorBoundary extends Component {
  state = {
    hasFailed: false,
  }

  constructor(props) {
    super(props)
  }

  static getDerivedStateFromError() {
    return {
      hasFailed: true,
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ERROR BOUNDARY CAUGHT', error.message, info)
  }

  render() {
    if (this.state.hasFailed) {
      return (
        <PersistantNotification isFullWidth isExpanded isInline intent="danger">
          Something went wrong here, try refreshing your page.
        </PersistantNotification>
      )
    }

    return <>{this.props.children}</>
  }
}

export default ErrorBoundary
