import * as React from 'react'
import { Modal, ModalProps } from '@reapit/elements'
import { connect } from 'react-redux'
import { setAppDetailModalStateView } from '@/actions/app-detail-modal'
import AppDetailInner from './app-detail-inner'
import AppDetailAsyncContainer from './app-detail-async-container'

export interface ActionDetailModalMappedAction {
  setAppDetailModalStateView: () => void
}

export type AppDetailModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & ActionDetailModalMappedAction

const mapDispatchToProps = (dispatch: any): ActionDetailModalMappedAction => ({
  setAppDetailModalStateView: () => dispatch(setAppDetailModalStateView())
})

export const handleAfterClose = (setAppDetailModalStateView: () => void, afterClose?: () => void) => () => {
  if (afterClose) {
    afterClose()
  }
  setAppDetailModalStateView()
}

export const AppDetailModal: React.FunctionComponent<AppDetailModalProps> = ({
  visible = true,
  afterClose,
  setAppDetailModalStateView
}) => {
  return (
    <Modal visible={visible} afterClose={handleAfterClose(setAppDetailModalStateView, afterClose)} renderChildren>
      <AppDetailAsyncContainer>
        <AppDetailInner afterClose={afterClose} />
      </AppDetailAsyncContainer>
    </Modal>
  )
}

const AppDetailModalWithConnect = connect(null, mapDispatchToProps)(AppDetailModal)

export default AppDetailModalWithConnect
