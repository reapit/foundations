import * as React from 'react'

export interface AppErrorProps {}
export interface AppErrorState {
  hasError: boolean
}

export default class AppError extends React.Component<
  AppErrorProps,
  AppErrorState
> {
  constructor(props: AppErrorProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any) {
    // Handle Error
    console.log(error)
  }

  handleGoHome = () => {
    document.location.href = document.location.origin
  }

  render() {
    if (this.state.hasError) {
      return <div>Error</div>
    }

    return this.props.children
  }
}
