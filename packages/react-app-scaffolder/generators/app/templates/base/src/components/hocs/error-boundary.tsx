import * as React from 'react'
import { connect } from 'react-redux'
import { errorThrownComponent } from '../../actions/error'
import { Dispatch } from 'redux'
import errorMessages from '../../constants/error-messages'
import { ErrorData } from '../../reducers/error'
import { ReduxState } from '@/types/core'

interface ErrorMappedActions {
  errorThrownComponent: (error: ErrorData) => void
}

interface ErrorMappedProps {
  componentError: ErrorData | null
}

export interface ErrorState {
  hasFailed: boolean
}

export type ErrorProps = ErrorMappedActions & ErrorMappedProps

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
    this.props.errorThrownComponent({
      type: 'COMPONENT',
      message: errorMessages.DEFAULT_COMPONENT_ERROR,
    })
    console.error('ERROR BOUNDARY CAUGHT', error.message, info)
  }

  render() {
    if (this.state.hasFailed) {
      return <p>Something went wrong here, try refreshing your page.</p>
    }

    return this.props.children
  }
}

const mapStateToProps = (state: ReduxState): ErrorMappedProps => ({
  componentError: state.error.componentError,
})

const mapDispatchToProps = (dispatch: Dispatch): ErrorMappedActions => ({
  errorThrownComponent: (error: ErrorData) => dispatch(errorThrownComponent(error)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary)
