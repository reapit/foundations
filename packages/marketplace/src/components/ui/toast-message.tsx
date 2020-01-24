import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ToastMessage, ToastVariant } from '@reapit/elements'
import { ReduxState } from '../../types/core'
import { hideNotificationMessage } from '../../actions/notification-message'

interface ToastMessageMappedActions {
  onCloseToast: () => void
}

interface ToastMessageMappedProps {
  visible: boolean
  variant: ToastVariant
  message: string
}

const mapStateToProps = (state: ReduxState): ToastMessageMappedProps => ({
  visible: state.noticationMessage.visible,
  variant: state.noticationMessage.variant || 'primary',
  message: state.noticationMessage.message,
})

const mapDispatchToProps = (dispatch: Dispatch): ToastMessageMappedActions => ({
  onCloseToast: () => dispatch(hideNotificationMessage(null)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ToastMessage)
