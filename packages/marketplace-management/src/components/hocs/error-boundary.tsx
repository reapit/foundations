import * as React from 'react'

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
  }

  render() {
    if (this.state.hasFailed) {
      return <p>Something went wrong here, try refreshing your page.</p>
    }

    return this.props.children
  }
}

export default ErrorBoundary
