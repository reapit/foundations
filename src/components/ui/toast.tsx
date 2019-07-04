import * as React from 'react'
import { ReduxState } from '../../types/core'
import { ErrorData } from '../../reducers/error'
import { errorClearedServer, errorClearedComponent } from '../../actions/error'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styles from '@/styles/blocks/toast.scss'

/**
 * TODO: Expand component to accept types info and success actions
 * just need to add appropriate actions and adjust the btn-danger
 * class to primary and success
 */

interface ToastMappedActions {
  errorClearedServer: () => void
  errorClearedComponent: () => void
}

interface ToastMappedProps {
  serverError: ErrorData | null
  componentError: ErrorData | null
}

export type ToastProps = ToastMappedActions & ToastMappedProps

export const Toast: React.FC<ToastProps> = ({
  serverError,
  componentError,
  errorClearedServer,
  errorClearedComponent
}) => {
  const error = componentError || serverError || null
  const isVisible = Boolean(error)
  const errorClearHandler = error && error.type === 'SERVER' ? errorClearedServer : errorClearedComponent

  if (isVisible) {
    setTimeout(errorClearHandler, 5000)
  }

  return (
    <div
      data-test="toast-wrapper"
      className={`${styles.toast} ${isVisible && styles.visible}`}
      onClick={errorClearHandler}
    >
      <button className="btn btn-danger btn-lg btn-block">{error && error.message}</button>
    </div>
  )
}

const mapStateToProps = (state: ReduxState): ToastMappedProps => ({
  serverError: state.error.serverError,
  componentError: state.error.componentError
})

const mapDispatchToProps = (dispatch: Dispatch): ToastMappedActions => ({
  errorClearedServer: () => dispatch(errorClearedServer(null)),
  errorClearedComponent: () => dispatch(errorClearedComponent(null))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toast)
