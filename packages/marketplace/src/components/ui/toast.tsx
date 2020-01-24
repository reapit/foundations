import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Toast, ErrorData } from '@reapit/elements'
import { ReduxState } from '../../types/core'
import { errorClearedServer, errorClearedComponent } from '../../actions/error'

interface ToastMappedActions {
  errorClearedServer: () => void
  errorClearedComponent: () => void
}

interface ToastMappedProps {
  serverError: ErrorData | null
  componentError: ErrorData | null
}

const mapStateToProps = (state: ReduxState): ToastMappedProps => ({
  serverError: state.error.serverError,
  componentError: state.error.componentError,
})

const mapDispatchToProps = (dispatch: Dispatch): ToastMappedActions => ({
  errorClearedServer: () => dispatch(errorClearedServer(null)),
  errorClearedComponent: () => dispatch(errorClearedComponent(null)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Toast)
