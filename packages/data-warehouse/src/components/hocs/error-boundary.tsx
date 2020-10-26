import * as React from 'react'
import { Alert } from '@reapit/elements'

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
    console.error('Error caught', error.message, info)
  }

  render() {
    if (this.state.hasFailed) {
      return <Alert message="Something went wrong, please refresh the page" type="danger" />
    }

    return this.props.children
  }
}

export default ErrorBoundary
