import * as React from 'react'

export type ErrorProps = {
  children?: React.ReactNode
}

export interface ErrorState {
  hasFailed: boolean
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
    this.setState({ hasFailed: true })
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
